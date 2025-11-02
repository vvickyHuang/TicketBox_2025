package com.ticketBox.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vc_record")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VcRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 所屬會員（多對一）
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 憑證識別資訊
    @Column(nullable = false, unique = true)
    private String cid; // VC 唯一識別碼 (jti 最後一段)

    @Column(nullable = false)
    private String vcType; // 模板代碼 (e.g. concert_ticket_vc)

    @Column(nullable = false)
    private String transactionId; // /api/qrcode/data 回傳的 transactionId

    @Column(nullable = false)
    private String status; // ACTIVE / REVOKED / EXPIRED

    // 票券資料
    @Column(nullable = false)
    private String area;

    @Column(nullable = false, length = 3)
    private String line;

    @Column(nullable = false, length = 3)
    private String seat;

    @Column(nullable = false)
    private String concertUuid; // 活動代號（uuid）

    // 系統記錄
    @Column(nullable = false)
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @Column
    private java.time.LocalDateTime updatedAt;
}