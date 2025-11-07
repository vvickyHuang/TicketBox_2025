package com.ticketBox.dto;

import lombok.Data;

/** 購票請求：由前端帶入基本座位與活動資訊 */
@Data
public class TicketVCStatusRequest {
    private String oderId;
}