package com.ticketBox.controller;

import com.ticketBox.dto.*;
import com.ticketBox.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    /**
     * 1) 購票：發行票VC（回傳 transactionId，前端接著叫 /bind 完成綁定）
     */
    @PostMapping("/createOrder")
    @Operation (summary = "購票", description = "產生訂單，發送付款網址給前端")
    public TicketOrderCreateResponse createOrder(@RequestBody TicketOrderRequest req) {
        return ticketService.createOrder(req);
    }

    /**
     * 2) 確認付款：付款完成後，前端呼叫此 API 確認付款，並取得 VC 綁定資訊（QR Code、Deep Link）
     */
    @GetMapping("/getVcQrcode/{code}")
    @Operation(summary = "確認付款", description = "付款成功後依訂單編號發行 VC 並回傳綁定資訊")
    public TicketOrderVCResponse getVcQrcode(@PathVariable("code") @Parameter(description = "驗證碼") String code) {
        if (code != null && code.startsWith("{") && code.endsWith("}")) {
            code = code.substring(1, code.length() - 1); // 去掉使用者誤輸入的大括號
        }
        return ticketService.getVcQrcode(code);
    }


    /**
     * 3) 查詢 VC 綁定狀態：前端輪詢確認是否已掃描 VC QRCode
     */
    @GetMapping("/check-status/{orderId}")
    @Operation(summary = "查詢 VC 綁定狀態", description = "前端輪詢確認是否已掃描 VC QRCode")
    public TicketVCStatusResponse checkStatus(@PathVariable("orderId") @Parameter(description = "訂單 UUID", example = "71c9f4e2-83a3-4626-937a-d613838914cd") String orderId) {
        if (orderId != null && orderId.startsWith("{") && orderId.endsWith("}")) {
            orderId = orderId.substring(1, orderId.length() - 1);
        }
        return ticketService.checkVcStatus(orderId);
    }


    @PostMapping("/sendVerifyCode")
    @Operation (summary = "發送驗證碼至使用者信箱", description = "發送驗證碼至使用者信箱")
    public TicketCodeResponse sendVerifyCode(@RequestBody TicketCodeRequest req) {
        return ticketService.sendVerifyCode(req);
    }


}