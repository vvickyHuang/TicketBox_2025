package com.ticketBox.service;

import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class VpAsyncService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Async
    public void pollVerifyVp(String transactionId, String tradeUuid, String mode) {
        int maxAttempts = 150;
        int attempt = 0;

        while (attempt < maxAttempts) {
            try {
                // 呼叫 verifier
                ResponseEntity<Map<String, Object>> response = digitalCredentialService.verifyVpRaw(transactionId);
                int statusCode = response.getStatusCodeValue();

                if (statusCode == 200) {
                    Map<String, Object> body = response.getBody();
                    if (body != null && Boolean.TRUE.equals(body.get("verifyResult"))) {
                        System.out.println("VP 已驗證成功！");

                        List<Map<String, Object>> dataList = (List<Map<String, Object>>) body.get("data");
                        if (dataList != null && !dataList.isEmpty()) {
                            try {
                                Map<String, String> claimsMap = extractClaims(dataList);
                                handleClaimsData(claimsMap, tradeUuid, mode); // <-- 呼叫另一個方法處理資料
                            } catch (Exception e) {
                                System.err.println("解析 claims 或處理資料時發生錯誤：" + e.getMessage());
                                e.printStackTrace();
                            }
                        }
                        break;
                    }
                }

                // 等 2 秒再輪詢
                Thread.sleep(2000);
                attempt++;

            } catch (Exception e) {
                System.err.println("輪詢過程發生錯誤：" + e.getMessage());
                e.printStackTrace();
                break;
            }
        }

        if (attempt == maxAttempts) {
            System.err.println("超時：未在時間內驗證成功");
        }
    }

    /**
     * 將 data 裡所有 claims 的 ename, value 轉成 Map
     */
    private Map<String, String> extractClaims(List<Map<String, Object>> dataList) {
        Map<String, String> claimsMap = new HashMap<>();
        try {
            for (Map<String, Object> data : dataList) {
                List<Map<String, Object>> claims = (List<Map<String, Object>>) data.get("claims");
                if (claims != null) {
                    for (Map<String, Object> claim : claims) {
                        String key = claim.get("ename").toString();
                        String value = claim.get("value").toString();
                        claimsMap.put(key, value);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("extractClaims() 發生錯誤：" + e.getMessage());
            e.printStackTrace();
        }
        return claimsMap;
    }

    /**
     * 處理 claims 結果（你可以在這裡寫入資料庫、通知前端等）
     */
    private void handleClaimsData(Map<String, String> claimsMap, String tradeUuid, String mode) {

        String orderId = claimsMap.get("orderUuid");
        String concertId = claimsMap.get("concertId");
        String area = claimsMap.get("area");
        String line = claimsMap.get("line");
        String seat = claimsMap.get("seat");

        Ticket ticket = ticketRepository.findByOrderUuidAndConcertIdAndAreaAndLineAndSeat(orderId, concertId, area, line, seat);
        if (ticket == null) {
            throw new IllegalStateException("找不到對應的票券");
        }

        ResponseEntity<Map<String, Object>> resp = digitalCredentialService.getCredentialRaw(ticket.getTransactionId());

        Map<String, Object> credential = digitalCredentialService.parseJwt((String) resp.getBody().get("credential"));
        String cid = (String) credential.get("cid");

        // 驗證 VC 資料是否與票券相符
        if (!cid.equals(ticket.getCid())) {
            throw new IllegalStateException("VC 資料與票券不符");
        }


        switch (mode) {
            case "TRADING":
                if ("TRADING".equals(ticket.getVcStatus())) {
                    throw new IllegalStateException("票券正在販售中");
                } else if ("ACTIVE".equals(ticket.getVcStatus())) {
                    ticket.setTradeUuid(tradeUuid);
                    ticket.setVcStatus("TRADING");
                    ticketRepository.save(ticket);
                } else {
                    throw new IllegalStateException("無法從狀態 " + ticket.getVcStatus() + " 進入 TRADING");
                }
                break;

            case "CANCEL":
                if ("TRADING".equals(ticket.getVcStatus())) {
                    ticket.setTradeUuid(tradeUuid);
                    ticket.setVcStatus("ACTIVE");
                    ticketRepository.save(ticket);
                } else {
                    throw new IllegalStateException("只有 TRADING 狀態可取消");
                }
                break;
            default:
                throw new IllegalArgumentException("未知的 mode: " + mode);
        }

    }

}
