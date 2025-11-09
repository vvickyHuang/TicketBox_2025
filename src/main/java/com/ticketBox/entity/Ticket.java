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

    /** 取得VC驗證碼 */
    @Column(name = "verify_code")
    private String verifyCode;

    /** 驗證時間 */
    @Column(name = "verify_Time")
    private Date verifyTime;

    /** 購買者電子郵件 */
    @Column(name = "email")
    private String email;

    /** 交易識別碼 */
    @Column(name = "trade_Token")
    private String tradeToken;

    /** 取得VC驗證碼 */
    @Column(name = "vc_Bind_Token")
    private String vcBindToken;



}
