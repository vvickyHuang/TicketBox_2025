package com.ticketBox.repository;

import com.ticketBox.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> { // concertId is @Id String
    Ticket findFirstByOrderUuid(String orderUuid);
    List<Ticket> findAllByVerifyCodeAndVcStatus(String verifyCode, String vcStatus);
    //找訂單號碼by mail跟orderUuid跟vcStatus
    List<Ticket> findAllByEmailAndOrderUuidAndVcStatus(String email, String orderUuid, String vcStatus);
    Ticket findByOrderUuidAndConcertIdAndAreaAndLineAndSeat(String orderId, String concertId, String area, String line, String seat);
}
