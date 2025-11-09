package com.ticketBox.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@Schema(description = "VC憑證回應資料")
public class TicketOrderVCResponse {

    @Schema(description = "VC憑證資料")
    private  List<TicketVcDTO> ticketVcDTOList;

    @Schema(description = "回應訊息", example = "請使用數位憑證皮夾 App 掃描 QR Code 完成綁定")
    private String message;
}