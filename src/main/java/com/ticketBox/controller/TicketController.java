package com.ticketBox.controller;

import com.ticketBox.entity.Ticket;
import com.ticketBox.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@AllArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/buy")
    @Operation(summary = "購票", description = "把票券transactionId寫入資料庫")
    public ResponseEntity<Ticket> create(@Validated @RequestBody Ticket ticket) {

        ResponseEntity<Ticket> ticketResponseEntity = ticketService.createTicket(ticket);

        return null;
    }

}

