package com.ticketBox.controller;

import com.ticketBox.dto.*;
import com.ticketBox.service.TicketOrderService;
import com.ticketBox.service.TicketTradingService;
import com.ticketBox.service.VCService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketTradingService ticketTradingService;
    @Autowired
    private TicketOrderService TicketOrderService;
    @Autowired
    private VCService vcService;

    /**
     * 1) 購票：發行票VC，產生訂單並回傳付款網址給前端
     */
    @PostMapping("/createOrder")
    @Operation (summary = "1. 購票", description = "產生訂單，發送付款網址給前端")
    public TicketOrderCreateResponse createOrder(@RequestBody TicketOrderCreateRequest req) {
        return TicketOrderService.createOrder(req);
    }


    /**
     * 2) 領取 VC 驗證碼：使用者輸入 email + orderId 後，系統發送驗證碼至使用者信箱
     */

    @PostMapping("/sendVerifyCode")
    @Operation (summary = "2. 領取VC的驗證碼，效期為五分鐘", description = "發送領取VC的驗證碼至使用者信箱")
    public TicketCodeResponse sendVerifyCode(@RequestBody TicketCodeRequest req) {
        return vcService.getVcVerifyCodeByEmail(req);
    }


    /**
     * 3) 確認付款：付款完成後，前端呼叫此 API 確認付款，並取得 VC 綁定資訊（QR Code、Deep Link）
     */
    @GetMapping("/getVcQrcode/{code}")
    @Operation(summary = "3. 取得VC綁定資訊", description = "付款成功後依訂單編號發行 VC 並回傳綁定資訊")
    public TicketOrderVCResponse getVcQrcode(@PathVariable("code") @Parameter(description = "驗證碼") String code) {
        if (code != null && code.startsWith("{") && code.endsWith("}")) {
            code = code.substring(1, code.length() - 1); // 去掉使用者誤輸入的大括號
        }
        return vcService.getVcQrcodeByEmail(code);
    }


    /**
     * 4) 查詢 VC 綁定狀態：前端輪詢確認是否已掃描 VC QRCode
     */
    @GetMapping("/check-status/{orderId}")
    @Operation(summary = "4. 查詢 VC 綁定狀態", description = "前端輪詢確認是否已掃描 VC QRCode")
    public TicketVCStatusResponse checkStatus(@PathVariable("orderId") @Parameter(description = "訂單 UUID", example = "71c9f4e2-83a3-4626-937a-d613838914cd") String orderId) {
        if (orderId != null && orderId.startsWith("{") && orderId.endsWith("}")) {
            orderId = orderId.substring(1, orderId.length() - 1);
        }
        return vcService.checkVcStatus(orderId);
    }

    /**
     *  5) 票券販售或取消: 前端呼叫此 API 產生驗證請求 QR Code，使用者掃描後進行票券販售或取消
     */
    @PostMapping("/ticketTrading")
    @Operation(summary = "S1.票券販售或取消", description = "mode 可為 TRADING 或 CANCEL")
    public TicketVpResponse ticketTrading(@RequestBody TicketVpRequest req) {
        return ticketTradingService.ticketTrading(req);
    }

    /**
     * 6) 查詢票券驗證狀態: 前端輪詢確認販售票券驗證結果
     */
    @GetMapping("/status")
    @Operation(summary = "S2. 查詢票券驗證狀態", description = "查詢票券驗證狀態")
    public ResponseEntity<?> getTicketStatus(@RequestParam String tradeToken) {
        Map<String, String> result = ticketTradingService.getVerifyStatus(tradeToken);
        return ResponseEntity.ok(result);
    }

    /**
     * 7) 撤銷 VC 憑證: 賣家確認收款後，呼叫此 API 撤銷舊 VC 憑證
     */
    @PostMapping("/revokeVc/{vcBindToken}")
    @Operation(summary = "S3. 撤銷 VC 憑證", description = "撤銷 VC 憑證")
    public ResponseEntity<?> revokeVc(@PathVariable("vcBindToken") @Parameter(description = "vcBindToken") String vcBindToken) {
        return ticketTradingService.revokeVc(vcBindToken);
    }

    /**
     * 查詢訂單所有票券狀態
     */
    @PostMapping("/tickets/orderStatus")
    @Operation(summary = "查詢訂單所有票券狀態", description = "查詢訂單所有票券狀態")
    public List<TicketOrderStatusDTO> getOrderStatus(@RequestBody TicketCodeRequest req) {
        return ticketTradingService.getOrderStatus(req);
    }



}