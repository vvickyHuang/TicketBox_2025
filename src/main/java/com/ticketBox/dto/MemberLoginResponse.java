package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員登入回應資料")
public class MemberLoginResponse {

    @Schema(description = "登入狀態", example = "SUCCESS")
    private String status;

    @Schema(description = "回應訊息", example = "登入成功")
    private String message;

    @Schema(description = "會員 ID", example = "vicky001")
    private String memberId;

    @Schema(description = "VC 狀態", example = "ACTIVE")
    private String vcStatus;

    @Schema(description = "持有人 DID", example = "did:key:z2dmzD81...", nullable = true)
    private String holderDid;

    @Schema(description = "VC 憑證唯一 ID (CID)", example = "a16187e9-755e-48ca-a9c0-622f76fe1360", nullable = true)
    private String cid;
}