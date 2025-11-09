package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員票券兌換碼回應資料")
public class TicketCodeResponse {
    @Schema(description = "兌換碼")
    private String message;
}