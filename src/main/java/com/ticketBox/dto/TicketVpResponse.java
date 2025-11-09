package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "會員票券VP回應資料")
public class TicketVpResponse {

    @Schema(description = "QR Code圖片Base64字串")
    private String qrcodeImage;
    @Schema(description = "授權連結URI")
    private String authUri;
    @Schema(description = "交易唯一識別碼")
    private String tradeToken;

}