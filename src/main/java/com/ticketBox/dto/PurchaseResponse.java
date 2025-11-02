package com.ticketBox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchaseResponse {
    private boolean success;
    private String message;
    private String transactionId;

    public static PurchaseResponse ok(String txId) {
        return new PurchaseResponse(true, "發券成功，請用戶掃描後再呼叫 /bind", txId);
    }

    public static PurchaseResponse fail(String msg) {
        return new PurchaseResponse(false, msg, null);
    }
}