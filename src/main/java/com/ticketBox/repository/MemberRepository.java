package com.ticketBox.repository;
import com.ticketBox.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(String memberId);
    Optional<Member> findByCid(String cid);
    boolean existsByMemberId(String memberId);
    boolean existsByCid(String memberId);
}