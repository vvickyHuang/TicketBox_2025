package com.ticketBox.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vc_record")
public class VcRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 關聯會員 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    /** 活動/場次識別 */
    @Column(name = "concert_uuid")
    private String concertUuid;

    /** 區域、排、座位 */
    @Column(name = "area")
    private String area;

    @Column(name = "line")
    private String line;

    @Column(name = "seat")
    private String seat;

    /** Sandbox 交易識別碼（發券後回傳） */
    @Column(name = "transaction_id")
    private String transactionId;

    /** 憑證唯一識別碼（Credential ID, 用於撤銷） */
    @Column(name = "cid")
    private String cid;

    /** 憑證持有者 / 發證者 DID */
    @Column(name = "holder_did")
    private String holderDid;

    @Column(name = "issuer_did")
    private String issuerDid;

    /** VC 模板代碼（如 CONCERT_TICKET） */
    @Column(name = "vc_uid")
    private String vcUid;

    /** 票券狀態（PENDING/ACTIVE/USED/REVOKED/REFUNDED/EXPIRED） */
    @Column(name = "vc_status")
    private String vcStatus;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}