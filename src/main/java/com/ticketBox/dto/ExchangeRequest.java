package com.ticketBox.dto;

import lombok.Data;

/** 換票請求：賣家確認收款後，撤銷舊的票VC */
@Data
public class ExchangeRequest {
    private String sellerTicketCid; // 舊票的 CID
    private boolean sellerConfirm;  // 賣家是否已確認收款
}