package com.ticketBox.service;

import com.ticketBox.Enum.VcUuidInfo;
import com.ticketBox.entity.VcRecord;
import com.ticketBox.entity.Member;
import com.ticketBox.repository.VcRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 票券交易流程：
 * 購票 → 發卡 → 驗證 → 入庫
 */
@Service
public class TicketTransactionFlow {

    @Autowired
    private DigitalCredentialService digitalCredentialService;

    @Autowired
    private VcRecordRepository vcRecordRepository;

    /**
     * 處理購票後的 VC 發行與入庫流程
     */
    @Transactional
    public void handleTicketPurchase(VcRecord vcRecord) {

        // Step 1️⃣ 構建票券 VC 欄位
        VcUuidInfo vc = VcUuidInfo.CONCERT_TICKET;
        Member member = vcRecord.getMember();

        List<Map<String, String>> fields = vc.buildFields(
                member.getMemberId(),
                vcRecord.getArea(),
                vcRecord.getLine(),
                vcRecord.getSeat(),
                vcRecord.getConcertUuid()
        );

        // Step 2️⃣ 呼叫 Sandbox API 建立票券 VC
        Map<String, Object> issueResult = digitalCredentialService.issueVcRaw(vc.getVcUid(), fields);
        if (issueResult == null || issueResult.isEmpty()) {
            System.out.println("❌ 建立票券 VC 失敗，請檢查 Sandbox API 回應。");
            return;
        }

        String txId = (String) issueResult.get("transactionId");
        System.out.println("🎟️ VC 已建立，等待用戶掃描 → transactionId = " + txId);

        // Step 3️⃣ 查詢憑證內容（使用 transactionId）
        Map<String, Object> credential = digitalCredentialService.getCredentialRaw(txId);
        if (credential == null || credential.containsKey("error")) {
            System.out.println("⚠️ 憑證尚未被掃描或無法查詢，請稍後再試。");
            return;
        }

        // Step 4️⃣ 解析回傳內容
        String cid = (String) credential.get("cid");
        String holderDid = (String) credential.get("holderDid");
        String issuerDid = (String) credential.get("issuerDid");

        // Step 5️⃣ 更新 VcRecord 欄位
        vcRecord.setTransactionId(txId);
        vcRecord.setCid(cid);
        vcRecord.setHolderDid(holderDid);
        vcRecord.setIssuerDid(issuerDid);
        vcRecord.setVcUid(vc.getVcUid());
        vcRecord.setVcStatus("ACTIVE");

        // Step 6️⃣ 儲存至資料庫
        saveToDb(vcRecord);

        System.out.println("✅ 票券綁定完成 → CID: " + cid + " | Holder DID: " + holderDid);
    }

    /**
     * 寫入資料庫
     */
    private void saveToDb(VcRecord vcRecord) {
        try {
            vcRecordRepository.save(vcRecord);
            System.out.println("🧾 已入庫 VC 記錄：" + vcRecord.getCid());
        } catch (Exception e) {
            System.err.println("❌ 儲存 VC 記錄失敗：" + e.getMessage());
        }
    }
}