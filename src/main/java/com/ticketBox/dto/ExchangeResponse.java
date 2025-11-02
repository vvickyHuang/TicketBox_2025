package com.ticketBox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExchangeResponse {
    private boolean success;
    private String message;

    public static ExchangeResponse ok(String msg) {
        return new ExchangeResponse(true, msg);
    }

    public static ExchangeResponse fail(String msg) {
        return new ExchangeResponse(false, msg);
    }
}