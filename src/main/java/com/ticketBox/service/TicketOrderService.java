package com.ticketBox.service;

import com.ticketBox.dto.TicketOrderCreateResponse;
import com.ticketBox.dto.TicketOrderCreateRequest;
import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class TicketOrderService {

    @Autowired
    private TicketRepository ticketRepository;

    @Transactional
    public TicketOrderCreateResponse createOrder(TicketOrderCreateRequest req) {

        try {
            String orderId = "";
            int randomNumber = ThreadLocalRandom.current().nextInt(100, 1000);
            String letters = RandomStringUtils.randomAlphabetic(3).toUpperCase();

            for (Ticket t : req.getTicketlist()) {
                orderId = t.getConcertId()+letters+randomNumber;

                Ticket ticket = new Ticket();
                ticket.setConcertId(t.getConcertId());
                ticket.setArea(t.getArea());
                ticket.setLine(t.getLine());
                ticket.setSeat(t.getSeat());
                ticket.setEmail(t.getEmail());
                ticket.setOrderUuid(orderId);
                ticket.setVcStatus("PENDING");
                ticket.setName(t.getName());
                ticketRepository.save(ticket);
            }

            return TicketOrderCreateResponse.builder()
                    .orderId(orderId)
                    .paymentUrl("https://payment.example.com/pay?orderId=" + orderId)
                    .build();

        }catch (Exception e){
            return TicketOrderCreateResponse.builder()
                    .orderId("fail")
                    .paymentUrl("")
                    .build();
        }
    }

}
