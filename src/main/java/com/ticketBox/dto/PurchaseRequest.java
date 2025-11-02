package com.ticketBox.dto;

import lombok.Data;

/** 購票請求：由前端帶入基本座位與活動資訊 */
@Data
public class PurchaseRequest {
    private String memberId;     // 平台會員識別（用來綁 Member）
    private String concertUuid;  // 活動/場次識別
    private String area;
    private String line;
    private String seat;
}