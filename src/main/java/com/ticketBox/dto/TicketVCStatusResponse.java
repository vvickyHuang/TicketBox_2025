package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "VC驗證狀態回應資料")
public class TicketVCStatusResponse {

    @Schema(description = "訂單編號")
    private String orderId;

    @Schema(description = "回應訊息", example = "請使用數位憑證皮夾 App 掃描 QR Code 完成綁定")
    private String message;

    @Schema(description = "VC 狀態", example = "PENDING")
    private String vcStatus;
}