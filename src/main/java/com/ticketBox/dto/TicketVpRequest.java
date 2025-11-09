package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員票券VP請求資料")
public class TicketVpRequest {

    @Schema(description= "交易模式", example = "TRADING/CANCEL")
    private String mode;
}