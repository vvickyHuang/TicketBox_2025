package com.ticketBox.Enum;

import lombok.Getter;

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
@Getter
public enum VcUuidInfo {

    // === 演唱會票券 VC ===
    CONCERT_TICKET(
            "00000000_concert_ticket_bts",
            "20251105",
            "20251205",
            List.of(
                    Map.of("ename", "orderUuid", "content", ""),
                    Map.of("ename", "concertId", "content", ""),
                    Map.of("ename", "area", "content", ""),
                    Map.of("ename", "line", "content", ""),
                    Map.of("ename", "seat", "content", "")
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