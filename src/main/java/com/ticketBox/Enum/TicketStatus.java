package com.ticketBox.Enum;

public enum TicketStatus {
    PENDING("PENDING"),   // 已發券，尚未完成綁定（等待用戶掃描與 /bind）
    ACTIVE("ACTIVE"),     // 綁定完成，正常有效
    USED("USED"),         // 入場已使用
    REVOKED("REVOKED"),   // 已撤銷（換票或退票）
    REFUNDED("REFUNDED"), // 已退票
    EXPIRED("EXPIRED");   // 已過期

    private final String value;
    TicketStatus(String value) { this.value = value; }
    public String getValue() { return value; }
}