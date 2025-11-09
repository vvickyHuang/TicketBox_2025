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
                    .tradeUuid("模式僅支援 TRADING 或 CANCEL")
                    .build();
        }
        Mode tradeMode = Mode.valueOf(modeStr);

        String qrcodeImage = body.get("qrcode_image").toString();
        String authUri = body.get("auth_uri").toString();
        String transactionId = body.get("transaction_id").toString();
        String tradeUuid = UUID.randomUUID().toString();

        //非同步輪詢
        vpAsyncService.pollVerifyVp(transactionId,tradeUuid,req.getMode());

        return TicketVpResponse.builder()
                .tradeUuid(tradeUuid)
                .qrcodeImage(qrcodeImage)
                .authUri(authUri)
                .build();
    }


    public Map<String, String> getVerifyStatus(String tradeUuid) {
        Map<String, String> response = new HashMap<>();

        try {
            Ticket ticket = ticketRepository.findByTradeUuid(tradeUuid);

            if (ticket == null) {
                response.put("message", "找不到該票券");
                response.put("VcStatusCode", "");
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
            response.put("VcStatusCode", ticket.getVcStatusCode());
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "查詢過程發生錯誤：" + e.getMessage());
            response.put("VcStatusCode", "");
            return response;
        }
    }

    //revoke VC
    @Transactional
    public ResponseEntity<Map<String, Object>> revokeVc(String vcStatusCode) {
        Ticket ticket = ticketRepository.findFirstByVcStatusCode(vcStatusCode);
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
}



