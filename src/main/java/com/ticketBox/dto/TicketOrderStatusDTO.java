package com.ticketBox.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TicketOrderStatusDTO {

    String orderId;
    String concertId;
    String email;
    String name;
    String vcStatus;
    String area;
    String line;
    String seat;
    String vcBindToken;

}
