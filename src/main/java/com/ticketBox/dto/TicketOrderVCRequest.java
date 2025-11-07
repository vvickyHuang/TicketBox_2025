package com.ticketBox.dto;

import lombok.Data;

/** 購票請求：由前端帶入基本座位與活動資訊 */
@Data
public class TicketOrderVCRequest {
    private String oderId;  // 活動/場次識別
    private String amount;
}