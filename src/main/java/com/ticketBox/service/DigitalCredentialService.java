package com.ticketBox.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

/**
 * 數位憑證整合服務（Issuer + Verifier）
 * Token 寫死
 * 成功回傳自訂 DTO
 * 錯誤回傳 sandbox 原始 JSON
 */
@Service
public class DigitalCredentialService {

    // === Base URLs ===
    private static final String ISSUER_BASE_URL = "https://issuer-sandbox.wallet.gov.tw";
    private static final String VERIFIER_BASE_URL = "https://verifier-sandbox.wallet.gov.tw";

    private static final String ISSUER_TOKEN = "7eubm0mTog8YAr8BrUsVkI6HrsWS4w5V";
    private static final String VERIFIER_TOKEN = "ymR7LRlNBfP6bDXz3SLVMGBZahMJhTMu";

    private final RestTemplate restTemplate = new RestTemplate();

    // === Header 建立器 ===
    private HttpHeaders buildHeaders(boolean isIssuer) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (isIssuer) {
            headers.set("Access-Token", ISSUER_TOKEN);
        } else {
            headers.set("Access-Token", VERIFIER_TOKEN);
        }
        return headers;
    }
    // === 通用 API 呼叫 ===
    private ResponseEntity<Map<String,Object>> call(String url, HttpMethod method, Object body, boolean isIssuer) {
        HttpHeaders headers = buildHeaders(isIssuer);
        HttpEntity<Object> entity = (body == null)
                ? new HttpEntity<>(headers)
                : new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map<String,Object>> resp = restTemplate.exchange(url, method, entity, (Class<Map<String,Object>>)(Class<?>)Map.class);
            System.out.println("Response: " + resp.getStatusCode() + " | " + resp.getBody());
            return resp;

        } catch (HttpClientErrorException e) {
            System.err.println("Sandbox returned " + e.getStatusCode() + ": " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("error", e.getResponseBodyAsString()));
        }
    }
    // =========================================================================
    // Issuer API 區塊
    // =========================================================================

    /** 發行 VC（產生 QR Code） */
    public ResponseEntity<Map<String,Object>> issueVcRaw(String vcUid, String iss, String exp, List<Map<String, String>> fields) {
        String url = ISSUER_BASE_URL + "/api/qrcode/data";

        Map<String, Object> body = Map.of(
                "vcUid", vcUid,
                "issuanceDate", iss,
                "expiredDate", exp,
                "fields", fields
        );
        return call(url, HttpMethod.POST, body, true);
    }

    /** 查詢 VC 憑證內容 */
    public ResponseEntity<Map<String,Object>> getCredentialRaw(String transactionId) {
        String url = ISSUER_BASE_URL + "/api/credential/nonce/" + transactionId;
        return call(url, HttpMethod.GET, null, true);
    }

    /** 撤銷 VC 憑證 */
    public ResponseEntity<Map<String,Object>> revokeVcRaw(String cid) {
        String url = ISSUER_BASE_URL + "/api/credential/" + cid + "/" + "revocation";
        return call(url, HttpMethod.PUT, null, true);
    }

    // =========================================================================
    // Verifier API 區塊
    // =========================================================================

    /** 驗證端：產生授權請求 QR Code */
    public ResponseEntity<Map<String,Object>> createVpQrCodeRaw() {
        String url = VERIFIER_BASE_URL + "/api/vp-item/451408/qrcode";
        return call(url, HttpMethod.GET, null, false);
    }

    /** 驗證端：查詢 VP 驗證結果 */
    public ResponseEntity<Map<String,Object>> verifyVpRaw(String transactionId) {
        String url = VERIFIER_BASE_URL + "/api/vp-item/verifyResult" + "/" + transactionId;
        return call(url, HttpMethod.GET, null, false);
    }
    // =========================================================================
    // JWT 解析
    // =========================================================================

    public Map<String, Object> parseJwt(String jwt) {
        try {
            String[] parts = jwt.split("\\.");
            String payload = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> data = mapper.readValue(payload, Map.class);

            String jti = data.get("jti").toString();
            String cid = (jti != null && jti.contains("/"))
                    ? jti.substring(jti.lastIndexOf("/") + 1)
                    : jti;

            return Map.of(
                    "status", "SUCCESS",
                    "message", "VC 憑證解析成功",
                    "holderDid", data.get("sub"),
                    "issuerDid", data.get("iss"),
                    "cid", cid,
                    "exp", data.get("exp"),
                    "nbf", data.get("nbf")
            );
        } catch (Exception e) {
            return Map.of("status", "ERROR", "message", "Failed to parse JWT: " + e.getMessage());
        }
    }
}
