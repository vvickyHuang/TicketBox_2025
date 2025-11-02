package com.ticketBox.repository;

import com.ticketBox.entity.VcRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VcRecordRepository extends JpaRepository<VcRecord, Long> {

    Optional<VcRecord> findByCid(String cid);

    Optional<VcRecord> findByTransactionId(String transactionId);
}