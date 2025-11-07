package com.ticketBox.repository;

import com.ticketBox.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> { // concertId is @Id String
    Ticket findFirstByOrderUuid(String orderUuid);
    List<Ticket> findFirstByVerifyCodeAndVcStatus(String verifyCode, String vcStatus);
    //找訂單號碼by mail跟orderUuid跟vcStatus
    List<Ticket> findAllByEmailAndOrderUuidAndVcStatus(String email, String orderUuid, String vcStatus);

}
