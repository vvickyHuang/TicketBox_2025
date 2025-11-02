package com.ticketBox.dto;

import lombok.Data;

/** 綁定請求：以 transactionId 取憑證內容（綁定 VP 與入庫） */
@Data
public class BindRequest {
    private String transactionId;
}