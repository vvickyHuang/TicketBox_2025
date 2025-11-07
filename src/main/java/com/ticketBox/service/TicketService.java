package com.ticketBox.service;

import com.ticketBox.Enum.VcUuidInfo;
import com.ticketBox.dto.*;
import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 三支 API 的主流程：
 * 1) 購票 purchase：發券（回 transactionId）
 * 2) 換票 exchange：賣家確認收款 → 撤銷舊VC
 * 3) 綁定 bind：以 transactionId 取得憑證內容 → 入庫
 */
@Service
public class TicketService {

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Autowired
    private TicketRepository ticketRepository;


    @Transactional
    public TicketOrderCreateResponse createOrder(TicketOrderRequest req) {

        try {

            String orderId = UUID.randomUUID().toString().replaceAll("-", "");

            for (Ticket t : req.getTicketlist()) {
                Ticket ticket = new Ticket();
                ticket.setConcertId(t.getConcertId());
                ticket.setArea(t.getArea());
                ticket.setLine(t.getLine());
                ticket.setSeat(t.getSeat());
                ticket.setEmail(t.getEmail());
                ticket.setOrderUuid(orderId);
                ticket.setVcStatus("PENDING");
                ticket.setPaymentStatus("PAID");//跳過付款流程，直接假設已付款
                ticketRepository.save(ticket);
            }

            return TicketOrderCreateResponse.builder()
                    .orderId(orderId)
                    .amount("6000")
                    .paymentUrl("https://payment.example.com/pay?orderId=" + orderId)
                    .build();

        }catch (Exception e){
            return TicketOrderCreateResponse.builder()
                    .orderId("fail")
                    .amount("0")
                    .paymentUrl("")
                    .build();
        }
    }

    public TicketCodeResponse sendVerifyCode(TicketCodeRequest req) {

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


            // 2. 產生驗證碼（email + orderId + 現在時間）
            Date now = new Date();
            String input = req.getEmail() + req.getOrderId() + now.getTime(); // 用 getTime() 讓字串更穩定
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(input.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b)); // 轉16進位
            }
            String verifyCode = sb.toString();

            // 3. 將同 email 的所有票更新成同一驗證碼
            for (Ticket t : tickets) {
                t.setVerifyCode(verifyCode);
                t.setVerifyTime(now);
            }
            ticketRepository.saveAll(tickets); // 一次更新全部

            // 4. 回傳
            return TicketCodeResponse.builder()
                    .message(verifyCode)
                    .build();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //領VC的時候打這支API
    public TicketOrderVCResponse getVcQrcode(String code) {

        Date now = new Date();
        ResponseEntity<Map<String,Object>> resp;
        List<TicketVcDTO> vcList = new ArrayList<>();
        List<Ticket> ticket = ticketRepository.findFirstByVerifyCodeAndVcStatus(code, "PENDING");

        if (ticket.isEmpty()) {
            return TicketOrderVCResponse.builder()
                    .ticketVcDTOList(null)
                    .message("驗證碼無效")
                    .build();
        }

        for (Ticket t : ticket) {
            //驗證碼有效時間為5分鐘
            long diff = now.getTime() - t.getVerifyTime().getTime();
            long diffMinutes = diff / (60 * 500);
            if (diffMinutes > 10) {
                return TicketOrderVCResponse.builder()
                        .ticketVcDTOList(null)
                        .message("驗證碼無效")
                        .build();
            }

            VcUuidInfo vc = VcUuidInfo.CONCERT_TICKET;
            List<Map<String, String>> fields = vc.buildFields(
                    t.getOrderUuid(), t.getConcertId(), t.getArea(), t.getLine(), t.getSeat()
            );

            //呼叫外部 API（發行 VC）
            resp = digitalCredentialService.issueVcRaw(
                    vc.getVcUid(), vc.getIssuanceDate(), vc.getExpiredDate(), fields);

            // 若沙盒回傳錯誤，直接透過 resp 回傳給前端
            if (!resp.getStatusCode().is2xxSuccessful()) {
                return TicketOrderVCResponse.builder()
                        .ticketVcDTOList(null)
                        .message("Sandbox 發券失敗: " + resp.getStatusCode())
                        .build();
            }

            Map<String,Object> body = resp.getBody();
            if (body == null) {
                return TicketOrderVCResponse.builder()
                        .ticketVcDTOList(null)
                        .message("發行端回傳空內容")
                        .build();
            }
            t.setTransactionId(body.get("transactionId").toString());
            ticketRepository.save(t);
            vcList.add(TicketVcDTO.builder()
                    .area(t.getArea())
                    .line(t.getLine())
                    .seat(t.getSeat())
                    .qrcode(body.get("qrCodeUrl").toString())
                    .deeplink(body.get("deepLink").toString())
                    .build());

        }

        return TicketOrderVCResponse.builder()
                .ticketVcDTOList(vcList)
                .message("請使用數位憑證皮夾 App 掃描 QR Code 完成綁定")
                .build();

    }

    //查詢 VC 狀態
    public TicketVCStatusResponse checkVcStatus(String orderId) {

        Ticket ticket = ticketRepository.findFirstByOrderUuid(orderId);

        if (ticket == null||("REVOKED".equals(ticket.getVcStatus()))) {
            return TicketVCStatusResponse.builder()
                    .orderId(orderId)
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

                ticket.setVcStatus("EXPIRED");
                ticketRepository.save(ticket);

                return TicketVCStatusResponse.builder()
                        .orderId(orderId)
                        .vcStatus("EXPIRED")
                        .message("VC 已過期或已撤銷，訂單已自動取消")
                        .build();
            }

            return TicketVCStatusResponse.builder()
                    .orderId(orderId)
                    .vcStatus("ERROR")
                    .message("Sandbox 查詢失敗: " + resp.getStatusCode())
                    .build();
        }

        // 若 sandbox 回傳成功但 credential 欄位不存在，代表還沒掃描
        if (body == null || !body.containsKey("credential")) {
            return TicketVCStatusResponse.builder()
                    .orderId(orderId)
                    .vcStatus("PENDING")
                    .message("尚未掃描 QR Code")
                    .build();
        }

        //解析 VC JWT
        Map<String, Object> credential = digitalCredentialService.parseJwt((String) body.get("credential"));
        String issuerDid = (String) credential.get("issuerDid");
        String cid = (String) credential.get("cid");

        // 更新 DB
        ticket.setIssuerDid(issuerDid);
        ticket.setCid(cid);
        ticket.setVcStatus("ACTIVE");
        ticketRepository.save(ticket);

        return TicketVCStatusResponse.builder()
                .vcStatus("ACTIVE")
                .message("VC 綁定完成")
                .orderId(orderId)
                .build();
    }

    @Async
    public void pollVerifyVp(String transactionId) {
        int maxAttempts = 150;
        int attempt = 0;

        while (attempt < maxAttempts) {
            try {
                // 呼叫 verifier
                ResponseEntity<Map<String, Object>> response = digitalCredentialService.verifyVpRaw(transactionId);
                Map<String, Object> result = response.getBody();

                if (result != null && "verified".equals(result.get("status"))) {
                    System.out.println("VP 已驗證成功！");
                    // 你可以在這裡更新資料庫或發事件通知前端
                    break;
                }

                // 等 2 秒再輪詢
                Thread.sleep(2000);
                attempt++;
            } catch (Exception e) {
                e.printStackTrace();
                break;
            }
        }

        if (attempt == maxAttempts) {
            System.out.println("超時：未在時間內驗證成功");
        }
    }

    public TicketVpResponse sellTicket() {
        // 1️⃣ 產生 QR code
        Map<String, Object> body = digitalCredentialService.createVpQrCodeRaw().getBody();

        String qrcodeImage = body.get("qrcode_image").toString();
        String authUri = body.get("auth_uri").toString();
        String transactionId = body.get("transaction_id").toString();

        // 啟動非同步輪詢
        pollVerifyVp(transactionId);

        // 回傳前端用的 DTO
        return TicketVpResponse.builder()
                .qrcodeImage(qrcodeImage)
                .authUri(authUri)
                .build();
    }
}



