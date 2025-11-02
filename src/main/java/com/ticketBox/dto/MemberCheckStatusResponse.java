package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "查詢 VC 綁定狀態回應資料")
public class MemberCheckStatusResponse {

    @Schema(description = "執行狀態", example = "SUCCESS")
    private String status;

    @Schema(description = "回應訊息", example = "VC 綁定完成")
    private String message;

    @Schema(description = "會員 ID", example = "vicky001")
    private String memberId;

    @Schema(description = "VC 憑證唯一 ID (CID)", example = "a16187e9-755e-48ca-a9c0-622f76fe1360")
    private String cid;

    @Schema(description = "VC 狀態", example = "ACTIVE")
    private String vcStatus;
}