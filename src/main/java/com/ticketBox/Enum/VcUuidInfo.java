package com.ticketBox.Enum;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Sandbox VC 模板統一管理
 * 每個 enum 固定包含：
 * - vcUid：模板代碼
 * - issuanceDate：發行日期（固定）
 * - expiredDate：到期日期（固定）
 * - fields：欄位定義（對應 Sandbox 模板結構）
 */
public enum VcUuidInfo {

    // === 會員卡 VC ===
    MEMBER_CARD(
            "00000000_ticket_box_member",
            "20251102",
            "20251202",
            List.of(
                    Map.of("ename", "memberId", "content", "")
            )
    ),

    // === 演唱會票券 VC ===
    CONCERT_TICKET(
            "00000000_concert_ticket_vc",
            "20251102",
            "20251202",
            List.of(
                    Map.of("ename", "memberId", "content", ""),
                    Map.of("ename", "area", "content", ""),
                    Map.of("ename", "line", "content", ""),
                    Map.of("ename", "seat", "content", ""),
                    Map.of("ename", "uuid", "content", "")
            )
    );

    private final String vcUid;
    private final String issuanceDate;
    private final String expiredDate;
    private final List<Map<String, String>> fields;

    VcUuidInfo(String vcUid, String issuanceDate, String expiredDate, List<Map<String, String>> fields) {
        this.vcUid = vcUid;
        this.issuanceDate = issuanceDate;
        this.expiredDate = expiredDate;
        this.fields = fields;
    }

    public String getVcUid() {
        return vcUid;
    }

    public String getIssuanceDate() {
        return issuanceDate;
    }

    public String getExpiredDate() {
        return expiredDate;
    }

    public List<Map<String, String>> getFields() {
        return fields;
    }

    /**
     * 建立新的欄位內容（依序填入 content）
     * 例：buildFields("vicky001", "A2", "014", "005", "uuid123")
     */
    public List<Map<String, String>> buildFields(String... values) {
        List<Map<String, String>> list = new ArrayList<>();
        for (int i = 0; i < fields.size(); i++) {
            String content = (i < values.length) ? values[i] : "";
            list.add(Map.of(
                    "ename", fields.get(i).get("ename"),
                    "content", content
            ));
        }
        return list;
    }

    @Override
    public String toString() {
        return String.format(
                "VcUuidInfo{vcUid='%s', issuanceDate='%s', expiredDate='%s', fields=%s}",
                vcUid, issuanceDate, expiredDate, fields
        );
    }
}