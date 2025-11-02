package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員註冊回應資料")
public class MemberRegisterResponse {

    @Schema(description = "執行狀態", example = "SUCCESS")
    private String status;

    @Schema(description = "回傳訊息", example = "註冊成功")
    private String message;

    @Schema(description = "會員 ID（若成功註冊則回傳）", example = "vicky001")
    private String memberId;
}