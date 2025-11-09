package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員訂單建立回應資料")
public class TicketOrderCreateResponse {

    @Schema(description = "訂單編號")
    private String orderId;

    @Schema(description = "付款連結")
    private String paymentUrl;
}