package com.ticketBox.service;

import com.ticketBox.Enum.TicketStatus;
import com.ticketBox.entity.VcRecord;
import com.ticketBox.repository.VcRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

/**
 * 票券生命週期管理：
 * 驗票 → 撤銷（轉售/退票前置） → 退票
 *
 * 注意：
 * - 撤銷/退票皆直接使用 DigitalCredentialService 內既有的沙盒 API 方法：
 *   revokeVcRaw(String cid)
 */
@Service
public class TicketLifecycleService {

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Autowired
    private VcRecordRepository vcRecordRepository;

    /**
     * ✅ 驗票流程：確認 VC 是否有效、未撤銷且未使用
     * 依賴 getCredentialRaw(transactionId) 查詢沙盒狀態
     */
    @Transactional
    public boolean verifyTicket(String cid, String transactionId) {
        Optional<VcRecord> opt = vcRecordRepository.findByCid(cid);
        if (opt.isEmpty()) {
            System.out.println("❌ 查無此票券：" + cid);
            return false;
        }

        VcRecord record = opt.get();

        // 向 Sandbox 查 VC 狀態（此方法已存在於 DigitalCredentialService）
        Map<String, Object> credential = digitalCredentialService.getCredentialRaw(transactionId);
        if (credential == null || credential.containsKey("error")) {
            System.out.println("⚠️ 憑證查詢失敗或尚未就緒：txId=" + transactionId);
            return false;
        }

        // 本地狀態檢查
        String status = record.getVcStatus();
        if (!TicketStatus.ACTIVE.getValue().equals(status)) {
            System.out.println("⚠️ 票券狀態非有效，當前狀態：" + status);
            return false;
        }

        // 標記為已使用
        record.setVcStatus(TicketStatus.USED.getValue());
        vcRecordRepository.save(record);

        System.out.println("✅ 驗票通過 → CID: " + cid);
        return true;
    }

    /**
     * ♻️ 撤銷流程（供轉售或其它使舊券失效的情境）
     * 直接呼叫 DigitalCredentialService.revokeVcRaw(cid)
     */
    @Transactional
    public boolean revokeTicket(String cid) {
        Optional<VcRecord> opt = vcRecordRepository.findByCid(cid);
        if (opt.isEmpty()) {
            System.out.println("❌ 查無此票券：" + cid);
            return false;
        }

        VcRecord record = opt.get();
        if (!TicketStatus.ACTIVE.getValue().equals(record.getVcStatus())) {
            System.out.println("⚠️ 無法撤銷，狀態非 ACTIVE：" + record.getVcStatus());
            return false;
        }

        // ✅ 使用既有的沙盒撤銷 API
        Map<String, Object> revokeResult = digitalCredentialService.revokeVcRaw(record.getCid());
        if (revokeResult == null || revokeResult.containsKey("error")) {
            System.out.println("❌ Sandbox 撤銷失敗：cid=" + record.getCid() +
                    "，原因=" + (revokeResult == null ? "null" : revokeResult.get("error")));
            return false;
        }

        record.setVcStatus(TicketStatus.REVOKED.getValue());
        vcRecordRepository.save(record);

        System.out.println("♻️ 撤銷完成 → CID: " + record.getCid());
        return true;
    }

    /**
     * 💸 退票流程：沙盒撤銷 + 本地狀態改為 REFUNDED
     * 亦直接呼叫 DigitalCredentialService.revokeVcRaw(cid)
     */
    @Transactional
    public boolean refundTicket(String cid) {
        Optional<VcRecord> opt = vcRecordRepository.findByCid(cid);
        if (opt.isEmpty()) {
            System.out.println("❌ 查無此票券：" + cid);
            return false;
        }

        VcRecord record = opt.get();

        if (!TicketStatus.ACTIVE.getValue().equals(record.getVcStatus())) {
            System.out.println("⚠️ 無法退票，狀態非 ACTIVE：" + record.getVcStatus());
            return false;
        }

        // ✅ 使用既有的沙盒撤銷 API
        Map<String, Object> revokeResult = digitalCredentialService.revokeVcRaw(record.getCid());
        if (revokeResult == null || revokeResult.containsKey("error")) {
            System.out.println("❌ Sandbox 撤銷失敗（退票）：cid=" + record.getCid() +
                    "，原因=" + (revokeResult == null ? "null" : revokeResult.get("error")));
            return false;
        }

        record.setVcStatus(TicketStatus.REFUNDED.getValue());
        vcRecordRepository.save(record);

        System.out.println("💸 退票完成 → CID: " + record.getCid());
        return true;
    }
}