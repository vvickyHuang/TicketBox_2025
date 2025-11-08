package com.ticketBox.dto;

import lombok.Builder;
import lombok.Data;

/** 購票請求：由前端帶入基本座位與活動資訊 */
@Data
@Builder
public class TicketVpResponse {

    private String qrcodeImage;
    private String authUri;
    private String tradeUuid;

}