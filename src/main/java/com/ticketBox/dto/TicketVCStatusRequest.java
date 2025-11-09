package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "VC驗證狀態請求資料")
public class TicketVCStatusRequest {
    @Schema(description= "訂單編號")
    private String oderId;
}