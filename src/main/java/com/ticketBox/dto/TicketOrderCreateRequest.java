package com.ticketBox.dto;

import com.ticketBox.entity.Ticket;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "會員票券訂單請求資料")
public class TicketOrderCreateRequest {
    @Schema(description = "票券清單")
    List<Ticket> ticketlist ;
}