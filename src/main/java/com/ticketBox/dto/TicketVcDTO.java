package com.ticketBox.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TicketVcDTO {

    String vcStatusCode;
    String area;
    String line;
    String seat;
    String qrcode;
    String deeplink;

}
