package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員票券兌換碼請求資料")
public class TicketCodeRequest {
    @Schema(description= "訂單編號")
    private String orderId;
    @Schema(description= "會員Email")
    private String email;

}