package com.ticketBox.service;

import com.ticketBox.dto.*;
import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class TicketTradingService {

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Autowired
    private VpAsyncService vpAsyncService;

    @Autowired
    private TicketRepository ticketRepository;




    public enum Mode {
        TRADING, CANCEL
    }

    public TicketVpResponse ticketTrading(TicketVpRequest req) {
        //產生QR code
        Map<String, Object> body = digitalCredentialService.createVpQrCodeRaw().getBody();

        String modeStr = Optional.ofNullable(req.getMode())
                .map(String::trim)
                .map(String::toUpperCase)
                .orElse("");

        if (!modeStr.equals("TRADING") && !modeStr.equals("CANCEL")) {
            return TicketVpResponse.builder()
                    .tradeToken("模式僅支援 TRADING 或 CANCEL")
                    .build();
        }
        Mode tradeMode = Mode.valueOf(modeStr);

        String qrcodeImage = body.get("qrcode_image").toString();
        String authUri = body.get("auth_uri").toString();
        String transactionId = body.get("transaction_id").toString();
        String tradeToken = UUID.randomUUID().toString();

        //非同步輪詢
        vpAsyncService.pollVerifyVp(transactionId,tradeToken,req.getMode());

        return TicketVpResponse.builder()
                .tradeToken(tradeToken)
                .qrcodeImage(qrcodeImage)
                .authUri(authUri)
                .build();
    }


    public Map<String, String> getVerifyStatus(String tradeToken) {
        Map<String, String> response = new HashMap<>();

        try {
            Ticket ticket = ticketRepository.findByTradeToken(tradeToken);

            if (ticket == null) {
                response.put("message", "找不到該票券");
                response.put("VcBindToken", "");
                return response;
            }

            String status = ticket.getVcStatus();
            String message;

            switch (status) {
                case "PENDING":
                    message = "尚未領取票券";
                    break;
                case "TRADING":
                    message = "票券販售中";
                    break;
                case "ACTIVE":
                    message = "票券持有中";
                    break;
                case "REVOKED":
                    message = "票券已撤銷";
                    break;
                default:
                    message = "其他狀態：" + status;
            }

            response.put("message", message);
            //移除VC需要的參數，因為直接跳過交易步驟，所以直接送給前端方便直接revokeVC
            response.put("VcBindToken", ticket.getVcBindToken());
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "查詢過程發生錯誤：" + e.getMessage());
            response.put("VcBindToken", "");
            return response;
        }
    }

    //revoke VC
    @Transactional
    public ResponseEntity<Map<String, Object>> revokeVc(String VcBindToken) {
        Ticket ticket = ticketRepository.findFirstByVcBindToken(VcBindToken);
        if (ticket == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "找不到對應的票券"));
        }

        String cid = ticket.getCid();

        try {
            ResponseEntity<Map<String, Object>> resp = digitalCredentialService.revokeVcRaw(cid);

            if (resp.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> body = resp.getBody();

                if (body != null && "REVOKED".equals(body.get("credentialStatus"))) {
                    Ticket t = ticketRepository.findByCid(cid);
                    if (t != null) {
                        t.setVcStatus("REVOKED");
                        ticketRepository.save(t);
                    }
                }
            }

            return resp;

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "撤銷過程發生錯誤：" + e.getMessage()));
        }
    }

    public List<TicketOrderStatusDTO> getOrderStatus (TicketCodeRequest req){

        List<Ticket> ticketList = ticketRepository.findAllByEmailAndOrderUuid(req.getEmail(),req.getOrderId());
        List<TicketOrderStatusDTO> orderlist = new ArrayList<>();
        for(Ticket t: ticketList){
            TicketOrderStatusDTO dto = new TicketOrderStatusDTO();
            dto.setConcertId(t.getConcertId());
            dto.setName(t.getName());
            dto.setEmail(t.getEmail());
            dto.setEmail(t.getEmail());
            dto.setVcStatus(t.getVcStatus());
            dto.setArea(t.getArea());
            dto.setLine(t.getLine());
            dto.setSeat(t.getSeat());
            dto.setOrderId(t.getOrderUuid());
            orderlist.add(dto);
        }

        return orderlist;
    }



}



