package com.ticketBox.service;

import com.ticketBox.entity.Ticket;
import com.ticketBox.repository.TicketRepository;
import com.ticketBox.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public ResponseEntity<Ticket> createTicket(Ticket ticket) {
        // 使用 JPA 的 save 方法保存票据
        ticketRepository.save(ticket);
        return ResponseEntity.ok(ticket); // 返回保存后的实体
    }



}
