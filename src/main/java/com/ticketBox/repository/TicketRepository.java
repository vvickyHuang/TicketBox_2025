package com.ticketBox.repository;

import com.ticketBox.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    Ticket findFirstByVcBindToken(String vcBindToken);
    List<Ticket> findAllByVerifyCodeAndVcStatus(String verifyCode, String vcStatus);
    List<Ticket> findAllByEmailAndOrderUuidAndVcStatus(String email, String orderUuid, String vcStatus);
    Ticket findByOrderUuidAndConcertIdAndAreaAndLineAndSeat(String orderId, String concertId, String area, String line, String seat);
    Ticket findByTradeToken(String tradeToken);
    Ticket findByCid(String cid);
}
