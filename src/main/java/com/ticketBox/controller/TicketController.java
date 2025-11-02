package com.ticketBox.controller;

import com.ticketBox.dto.BindRequest;
import com.ticketBox.dto.BindResponse;
import com.ticketBox.dto.ExchangeRequest;
import com.ticketBox.dto.ExchangeResponse;
import com.ticketBox.dto.PurchaseRequest;
import com.ticketBox.dto.PurchaseResponse;
import com.ticketBox.service.TicketService;
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
    @PostMapping("/purchase")
    public PurchaseResponse purchase(@RequestBody PurchaseRequest req) {
        return ticketService.purchaseIssue(req);
    }

    /**
     * 2) 換票：賣家確認收款後，撤銷舊票VC
     */
    @PostMapping("/exchange")
    public ExchangeResponse exchange(@RequestBody ExchangeRequest req) {
        return ticketService.exchangeRevoke(req);
    }

    /**
     * 3) 綁定：以 transactionId 綁定（完成 VP 綁定、入庫）
     *    購票與換票後都共用這支 API
     */
    @PostMapping("/bind")
    public BindResponse bind(@RequestBody BindRequest req) {
        return ticketService.bindByTransactionId(req);
    }
}