package com.ticketBox.service;

import com.ticketBox.Enum.VcUuidInfo;
import com.ticketBox.dto.*;
import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class VCService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private DigitalCredentialService digitalCredentialService;


    //根據 email + orderId 發送領取VC的驗證碼
    public TicketCodeResponse getVcVerifyCodeByEmail(TicketCodeRequest req) {

        try {
            // 1. 查出該 email + orderUuid 下所有 PENDING 票券
            List<Ticket> tickets = ticketRepository.findAllByEmailAndOrderUuidAndVcStatus(
                    req.getEmail(),
                    req.getOrderId(),
                    "PENDING"
            );

            if (tickets.isEmpty()) {
                return TicketCodeResponse.builder()
                        .message("請確認資訊是否正確")
                        .build();
            }


            // 2. 產生驗證碼
            SecureRandom random = new SecureRandom();
            byte[] bytes = new byte[16];
            random.nextBytes(bytes);
            String verifyCode = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

            // 3. 將同 email 的所有票更新成同一驗證碼
            for (Ticket t : tickets) {
                t.setVerifyCode(verifyCode);
                t.setVerifyTime(new Date());
            }
            ticketRepository.saveAll(tickets);

            return TicketCodeResponse.builder()
                    .message(verifyCode)
                    .build();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //根據驗證碼發行 VC 並回傳綁定資訊
    public TicketOrderVCResponse getVcQrcodeByEmail(String code) {
        Date now = new Date();
        ResponseEntity<Map<String, Object>> resp;
        List<TicketVcDTO> vcList = new ArrayList<>();
        String message = "請使用數位憑證皮夾 App 掃描 QR Code 完成綁定";

        // 查出所有符合驗證碼且狀態為 PENDING 的票券
        List<Ticket> tickets = ticketRepository.findAllByVerifyCodeAndVcStatus(code, "PENDING");
        if (tickets.isEmpty()) {
            return buildResponse(null, "驗證碼無效");
        }

        for (Ticket t : tickets) {
            try {
                // 計算驗證碼是否過期
                long diffMs = now.getTime() - t.getVerifyTime().getTime();
                long expireMs = 5 * 60 * 1000;
                if (diffMs > expireMs) {
                    return buildResponse(null, "驗證碼無效");
                }

                // 生成亂數與憑證欄位
                String vcStatusCode = t.getOrderUuid() + String.format("%04d", ThreadLocalRandom.current().nextInt(10000));
                VcUuidInfo vc = VcUuidInfo.CONCERT_TICKET;
                List<Map<String, String>> fields = vc.buildFields(t.getOrderUuid(), t.getConcertId(), t.getArea(), t.getLine(), t.getSeat());

                // 發行 VC
                resp = digitalCredentialService.issueVcRaw(vc.getVcUid(), vc.getIssuanceDate(), vc.getExpiredDate(), fields);
                if (!resp.getStatusCode().is2xxSuccessful()) {
                    return buildResponse(null, "發行端發券失敗：" + resp.getStatusCode());
                }

                Map<String, Object> body = resp.getBody();
                if (body == null) {
                    return buildResponse(null, "發行端回傳空內容");
                }

                // 更新資料庫
                t.setTransactionId(body.get("transactionId").toString());
                t.setVcStatusCode(vcStatusCode);
                ticketRepository.save(t);

                // 加入結果清單
                vcList.add(TicketVcDTO.builder()
                        .vcStatusCode(vcStatusCode)
                        .area(t.getArea())
                        .line(t.getLine())
                        .seat(t.getSeat())
                        .qrcode(body.get("qrCode").toString())
                        .deeplink(body.get("deepLink").toString())
                        .build());

            } catch (Exception e) {
                return buildResponse(null, "發行過程發生錯誤：" + e.getMessage());
            }
        }

        return buildResponse(vcList, message);
    }

    private TicketOrderVCResponse buildResponse(List<TicketVcDTO> list, String message) {
        return TicketOrderVCResponse.builder()
                .ticketVcDTOList(list)
                .message(message)
                .build();
    }

    //查詢 VC綁定狀態
    public TicketVCStatusResponse checkVcStatus(String vcStatusCode) {

        Ticket ticket = ticketRepository.findFirstByVcStatusCode(vcStatusCode);

        if (ticket == null||("REVOKED".equals(ticket.getVcStatus()))) {
            return TicketVCStatusResponse.builder()
                    .orderId(vcStatusCode)
                    .vcStatus("FAILED")
                    .message("查無此訂單")
                    .build();
        }

        ResponseEntity<Map<String, Object>> resp = digitalCredentialService.getCredentialRaw(ticket.getTransactionId());
        Map<String, Object> body = resp.getBody();

        //回傳錯誤
        if (!resp.getStatusCode().is2xxSuccessful()) {
            // 若是 credential not found → 視為過期並自動取消訂單
            if (body != null && ("61010".equals(body.get("code")) ||
                    (body.get("message") != null && body.get("message").toString().contains("credential not found")))) {
                return TicketVCStatusResponse.builder()
                        .message("VC 已過期或已撤銷")
                        .build();
            }

            return TicketVCStatusResponse.builder()
                    .vcStatus("ERROR")
                    .message("發行端VC查詢失敗: " + resp.getStatusCode())
                    .build();
        }

        // 若 sandbox 回傳成功但 credential 欄位不存在，代表還沒掃描
        if (body == null || !body.containsKey("credential")) {
            return TicketVCStatusResponse.builder()
                    .vcStatus("PENDING")
                    .message("尚未掃描 QR Code")
                    .build();
        }

        //解析 VC JWT
        Map<String, Object> credential = digitalCredentialService.parseJwt(body.get("credential").toString());
        String issuerDid = credential.get("issuerDid").toString();
        String cid = credential.get("cid").toString();

        // 更新 DB
        ticket.setIssuerDid(issuerDid);
        ticket.setCid(cid);
        ticket.setVcStatus("ACTIVE");
        ticketRepository.save(ticket);

        return TicketVCStatusResponse.builder()
                .vcStatus("ACTIVE")
                .message("VC 綁定完成")
                .build();
    }

}
