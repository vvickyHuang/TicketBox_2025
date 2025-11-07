package com.ticketBox.dto;

import com.ticketBox.entity.Ticket;
import lombok.Data;

import java.util.List;

/** 購票請求：由前端帶入基本座位與活動資訊 */
@Data
public class TicketOrderRequest {
    List<Ticket> ticketlist ;
}