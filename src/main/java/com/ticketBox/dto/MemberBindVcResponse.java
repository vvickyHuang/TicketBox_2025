package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員 VC 綁定回應資料")
public class MemberBindVcResponse {

    @Schema(description = "會員ID", example = "vicky001")
    private String memberId;

    @Schema(description = "執行狀態", example = "PENDING")
    private String status;

    @Schema(description = "回應訊息", example = "請使用數位憑證皮夾 App 掃描 QR Code 完成綁定")
    private String message;

    @Schema(description = "交易代碼 (transactionId)", example = "be08beaa-d5f8-4a27-ac44-7ac7cad8b9eb")
    private String transactionId;

    @Schema(description = "QR Code Base64 圖片字串", example = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZA...")
    private String qrCode;

    @Schema(description = "Deep Link，用於打開數位憑證皮夾", example = "modadigitalwallet://credential_offer?...")
    private String deepLink;

    @Schema(description = "VC 狀態", example = "PENDING")
    private String vcStatus;
}