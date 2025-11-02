package com.ticketBox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BindResponse {
    private boolean success;
    private String message;
    private String cid;
    private String holderDid;
    private String issuerDid;

    public static BindResponse ok(String cid, String holderDid, String issuerDid) {
        return new BindResponse(true, "綁定成功", cid, holderDid, issuerDid);
    }

    public static BindResponse fail(String msg) {
        return new BindResponse(false, msg, null, null, null);
    }
}