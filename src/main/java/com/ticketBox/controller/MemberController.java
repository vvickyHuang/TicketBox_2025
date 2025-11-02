package com.ticketBox.controller;

import com.ticketBox.dto.*;
import com.ticketBox.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    @Operation(summary = "會員登入", description = "驗證帳號密碼，回傳會員基本與 VC 狀態")
    public ResponseEntity<MemberLoginResponse> login(
            @RequestParam String memberId,
            @RequestParam String password
    ) {
        return ResponseEntity.ok(memberService.login(memberId, password));
    }

    @PostMapping("/register")
    @Operation(summary = "註冊會員", description = "建立新會員帳號與密碼（尚未綁定 VC）")
    public ResponseEntity<MemberRegisterResponse> register(
            @RequestParam String memberId,
            @RequestParam String password
    ) {
        return ResponseEntity.ok(memberService.registerMember(memberId, password));
    }

    @PostMapping("/bind-vc")
    @Operation(summary = "綁定會員 VC", description = "發行 VC 並回傳 QR Code 或錯誤訊息（直接顯示 sandbox 回傳內容）")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "建立成功"),
            @ApiResponse(responseCode = "400", description = "沙盒錯誤（會顯示原始 JSON）"),
            @ApiResponse(responseCode = "500", description = "系統錯誤")
    })
    public ResponseEntity<?> bindVc(@RequestParam String memberId) {
        return memberService.bindVc(memberId);
    }

    @GetMapping("/check-status/{memberId}")
    @Operation(summary = "查詢 VC 綁定狀態", description = "前端輪詢確認是否已掃描 VC QR Code（錯誤訊息為 sandbox 原樣）")
    public ResponseEntity<?> checkStatus(@PathVariable String memberId) {
        return memberService.checkVcStatus(memberId);
    }
}
