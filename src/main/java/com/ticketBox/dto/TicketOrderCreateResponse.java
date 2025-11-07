package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員 VC 綁定回應資料")
public class TicketOrderCreateResponse {

    @Schema(description = "訂單編號", example = "orderId")
    private String orderId;

    @Schema(description = "回應訊息", example = "1000")
    private String amount;

    @Schema(description = "paymentUrl", example = "")
    private String paymentUrl;
}