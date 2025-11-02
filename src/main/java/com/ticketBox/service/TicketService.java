package com.ticketBox.service;

import com.ticketBox.Enum.TicketStatus;
import com.ticketBox.Enum.VcUuidInfo;
import com.ticketBox.dto.*;
import com.ticketBox.entity.Member;
import com.ticketBox.entity.VcRecord;
import com.ticketBox.repository.MemberRepository;
import com.ticketBox.repository.VcRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 三支 API 的主流程：
 * 1) 購票 purchase：發券（回 transactionId）
 * 2) 換票 exchange：賣家確認收款 → 撤銷舊VC
 * 3) 綁定 bind：以 transactionId 取得憑證內容 → 入庫
 */
@Service
public class TicketService {

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Autowired
    private VcRecordRepository vcRecordRepository;

    @Autowired
    private MemberRepository memberRepository;

    /**
     * 1) 購票：向 Sandbox 發行 Ticket VC，回傳 transactionId
     *    後續由前端在用戶掃描完成後，呼叫 /bind 完成綁定
     */
    @Transactional
    public PurchaseResponse purchaseIssue(PurchaseRequest req) {
        Member member = findMember(req.getMemberId());

        VcUuidInfo vc = VcUuidInfo.CONCERT_TICKET;
        List<Map<String, String>> fields = vc.buildFields(
                member, req.getArea(), req.getLine(), req.getSeat(), req.getConcertUuid()
        );

        Map<String, Object> issue = digitalCredentialService.issueVcRaw(vc.getVcUid(), fields);
        if (issue == null || issue.isEmpty()) {
            return PurchaseResponse.fail("Sandbox 發券失敗或無回應");
        }

        // transactionId 防呆
        String txId = Optional.ofNullable(issue.get("transactionId"))
                .orElse(issue.get("txId"))
                .map(String::valueOf)
                .orElse(null);
        if (txId == null) {
            return PurchaseResponse.fail("Sandbox 未回傳 transactionId");
        }

        // 入庫
        VcRecord rec = new VcRecord();
        rec.setMember(member);
        rec.setConcertUuid(req.getConcertUuid());
        rec.setArea(req.getArea());
        rec.setLine(req.getLine());
        rec.setSeat(req.getSeat());
        rec.setTransactionId(txId);
        rec.setVcUid(vc.getVcUid());
        rec.setVcStatus(TicketStatus.PENDING.getValue());
        vcRecordRepository.save(rec);

        return PurchaseResponse.ok(txId);
    }

    /**
     * 2) 換票：賣家確認收款 → 撤銷舊 VC
     */
    @Transactional
    public ExchangeResponse exchangeRevoke(ExchangeRequest req) {
        VcRecord old = vcRecordRepository.findByCid(req.getSellerTicketCid()).orElse(null);
        if (old == null) {
            return ExchangeResponse.fail("查無 sellerTicketCid 對應的票券");
        }
        if (!TicketStatus.ACTIVE.getValue().equals(old.getVcStatus())) {
            return ExchangeResponse.fail("票券狀態非 ACTIVE，無法撤銷，當前：" + old.getVcStatus());
        }
        if (!req.isSellerConfirm()) {
            return ExchangeResponse.fail("賣家尚未確認收款，暫不撤銷");
        }

        Map<String, Object> revoke = digitalCredentialService.revokeCredential(old.getCid());
        if (revoke == null || revoke.containsKey("error") || !Boolean.TRUE.equals(revoke.get("revoked"))) {
            return ExchangeResponse.fail("Sandbox 撤銷失敗：" + revoke);
        }

        old.setVcStatus(TicketStatus.REVOKED.getValue());
        vcRecordRepository.save(old);
        return ExchangeResponse.ok("撤銷完成，買家可按下『綁定』建立新票");
    }

    /**
     * 3) 綁定（購票或換票後）
     */
    @Transactional
    public BindResponse bindByTransactionId(BindRequest req) {
        VcRecord rec = vcRecordRepository.findByTransactionId(req.getTransactionId()).orElse(null);
        if (rec == null) {
            return BindResponse.fail("查無 transactionId 對應的暫存記錄");
        }

        Map<String, Object> credential = digitalCredentialService.getCredentialRaw(req.getTransactionId());
        if (credential == null || credential.containsKey("error")) {
            return BindResponse.fail("憑證尚未掃描或查詢失敗：" + credential.get("error"));
        }

        String cid = String.valueOf(credential.get("cid"));
        String holderDid = String.valueOf(credential.get("holderDid"));
        String issuerDid = String.valueOf(credential.get("issuerDid"));

        rec.setCid(cid);
        rec.setHolderDid(holderDid);
        rec.setIssuerDid(issuerDid);
        rec.setVcStatus(TicketStatus.ACTIVE.getValue());
        vcRecordRepository.save(rec);

        return BindResponse.ok(cid, holderDid, issuerDid);
    }

    // ----------------- helper -----------------

    private Member findMember(String memberId) {
        return memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("查無會員：" + memberId));
    }

    @Transactional
    public boolean verifyTicket(String ticketId) {
        VcRecord record = vcRecordRepository.findById(ticketId).orElseThrow();
        Map<String, Object> qr = digitalCredentialService.createVpQrCodeRaw();
        String txId = (String) qr.get("transactionId");

        // 等使用者掃描
        Map<String, Object> result = digitalCredentialService.verifyVpRaw(txId);
        return Boolean.TRUE.equals(result.get("verifyResult"));
    }
}