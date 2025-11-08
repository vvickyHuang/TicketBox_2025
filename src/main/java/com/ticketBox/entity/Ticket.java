package com.ticketBox.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Ticket")
//VP票券
public class Ticket {

    /** 活動/場次識別 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "concert_id")
    private String concertId;

    @Column(name = "order_uuid")
    private String orderUuid;

    /** 區域、排、座位 */
    @Column(name = "area")
    private String area;

    @Column(name = "line")
    private String line;

    @Column(name = "seat")
    private String seat;

    /** 憑證唯一識別碼（Credential ID, 用於撤銷） */
    @Column(name = "cid")
    private String cid;

    /** 票券狀態（PENDING/ACTIVE/USED/REVOKED/EXPIRED） */
    @Column(name = "vc_status")
    private String vcStatus;

    @Column(name = "transaction_id")
    private String transactionId;

    /** 發行者 DID */
    @Column(name = "issuer_did")
    private String issuerDid;

    @Column(name = "verify_code")
    private String verifyCode;

    @Column(name = "verify_Time")
    private Date verifyTime;

    @Column(name = "email")
    private String email;

    @Column(name = "trade_Uuid")
    private String tradeUuid;

    @Column(name = "vc_Status_Code")
    private String vcStatusCode;



}
