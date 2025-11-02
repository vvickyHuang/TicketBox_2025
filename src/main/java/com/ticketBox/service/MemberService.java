package com.ticketBox.service;

import com.ticketBox.Enum.VcUuidInfo;
import com.ticketBox.dto.*;
import com.ticketBox.entity.Member;
import com.ticketBox.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final DigitalCredentialService digitalCredentialService;

    // 會員登入
    public MemberLoginResponse login(String memberId, String password) {
        Optional<Member> memberOpt = memberRepository.findByMemberId(memberId);

        // 查無會員：統一格式回傳
        if (memberOpt.isEmpty()) {
            return MemberLoginResponse.builder()
                    .status("FAILED")
                    .message("帳號或密碼錯誤")
                    .memberId(memberId)
                    .build();
        }

        Member member = memberOpt.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 密碼錯誤
        if (!encoder.matches(password, member.getPassword())) {
            return MemberLoginResponse.builder()
                    .status("FAILED")
                    .message("帳號或密碼錯誤")
                    .memberId(memberId)
                    .build();
        }

        // 登入成功狀態說明
        String msg = switch (member.getVcStatus()) {
            case "ACTIVE" -> "登入成功（VC 綁定完成）";
            case "PENDING" -> "登入成功，但 VC 尚未綁定";
            default -> "登入成功";
        };

        return MemberLoginResponse.builder()
                .status("SUCCESS")
                .message(msg)
                .memberId(memberId)
                .vcStatus(member.getVcStatus())
                .cid(member.getCid())
                .build();
    }
    // step1. 註冊會員
    public MemberRegisterResponse registerMember(String memberId, String password) {
        if (memberRepository.existsByMemberId(memberId)) {
            return MemberRegisterResponse.builder()
                    .status("DUPLICATE")
                    .message("帳號已存在")
                    .memberId(memberId)
                    .build();
        }

        String hash = new BCryptPasswordEncoder().encode(password);
        Member member = Member.builder()
                .memberId(memberId)
                .password(hash)
                .vcStatus("UNBOUND")
                .build();
        memberRepository.save(member);

        return MemberRegisterResponse.builder()
                .status("SUCCESS")
                .message("註冊成功")
                .memberId(memberId)
                .build();
    }

    // Step2. 綁定 VC
    public ResponseEntity<?> bindVc(String memberId) {
        Optional<Member> memberOpt = memberRepository.findByMemberId(memberId);

        // 查無會員
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", "FAILED",
                            "message", "查無此會員",
                            "memberId", memberId
                    ));
        }

        Member member = memberOpt.get();
        VcUuidInfo vc = VcUuidInfo.MEMBER_CARD;
        List<Map<String, String>> fields = vc.buildFields(memberId);

        //檢查是否已綁定
        if (StringUtils.hasText(member.getCid())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "status", "FAILED",
                            "message", "此會員已綁定 VC，無法重複綁定",
                            "memberId", memberId
                    ));
        }

        //呼叫外部 API（發行 VC）
        ResponseEntity<Map> resp = digitalCredentialService.issueVcRaw(
                vc.getVcUid(), vc.getIssuanceDate(), vc.getExpiredDate(), fields);

        // 若沙盒回傳錯誤，直接透過 resp 回傳給前端
        if (!resp.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(resp.getStatusCode()).body(resp.getBody());
        }

        Map<String, Object> body = resp.getBody();
        if (body == null) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "ERROR", "message", "發行端回傳空內容"));
        }

        // 成功
        String txId = (String) body.get("transactionId");
        member.setTransactionId(txId);
        member.setVcStatus("PENDING");
        memberRepository.save(member);

        MemberBindVcResponse response = MemberBindVcResponse.builder()
                .memberId(memberId)
                .vcStatus("PENDING")
                .message("請使用數位憑證皮夾 App 掃描 QR Code 完成綁定")
                .transactionId(txId)
                .qrCode((String) body.get("qrCode"))
                .deepLink((String) body.get("deepLink"))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Step3. 查詢 VC 狀態
    public ResponseEntity<?> checkVcStatus(String memberId) {
        Optional<Member> memberOpt = memberRepository.findByMemberId(memberId);

        // ✅ 查無會員：統一格式
        if (memberOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "status", "FAILED",
                            "message", "查無此會員",
                            "memberId", memberId
                    ));
        }

        Member member = memberOpt.get();
        ResponseEntity<Map> resp = digitalCredentialService.getCredentialRaw(member.getTransactionId());

        // ✅ 沙盒回傳錯誤 → 原樣回傳 Swagger
        if (!resp.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(resp.getStatusCode()).body(resp.getBody());
        }

        // ✅ 成功 → 解析內容、更新資料庫
        Map<String, Object> body = resp.getBody();
        if (body == null || !body.containsKey("credential")) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of(
                            "status", "PENDING",
                            "message", "尚未掃描 QR Code",
                            "memberId", memberId
                    ));
        }

        Map<String, Object> credential = digitalCredentialService.parseJwt((String) body.get("credential"));
        String holderDid = (String) credential.get("holderDid");
        String cid = (String) credential.get("cid");

        member.setHolderDid(holderDid);
        member.setCid(cid);
        member.setVcStatus("ACTIVE");
        memberRepository.save(member);

        MemberCheckStatusResponse response = MemberCheckStatusResponse.builder()
                .vcStatus("ACTIVE")
                .message("VC 綁定完成")
                .memberId(memberId)
                .cid(cid)
                .build();

        return ResponseEntity.ok(response);
    }}
