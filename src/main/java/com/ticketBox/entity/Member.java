package com.ticketBox.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memberId;
    private String password;
    private String holderDid;
    private String cid;
    private String vcStatus;
    private String transactionId;  // 會員 VC 發卡時的交易ID
    private LocalDateTime createdAt = LocalDateTime.now();
}
