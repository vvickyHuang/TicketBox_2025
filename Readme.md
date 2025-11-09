這是一份根據您提供的後端 Java 原始碼、`pom.xml` 和相關設定檔所產生的新版 `README.md` 內容。

-----

# TicketBox 後端服務

TicketBox 是一個基於 DID/VC（去中心化身份/可驗證憑證）的票券交易與驗證平台。此專案是 Spring Boot 應用程式，負責處理所有票券生命週期、訂單管理以及與數位憑證錢包的互動。

## 核心功能

根據 `TicketController.java` 和 `TicketService.java`，後端 API 提供以下主要功能：

* **訂單建立**：`POST /api/tickets/createOrder`
    * 接收票券資訊（場次、座位、Email等），產生訂單並將票券狀態設為 `PENDING`。
* **發送驗證碼**：`POST /api/tickets/sendVerifyCode`
    * 根據 Email 和訂單 ID，產生一個用於領取 VC 的驗證碼。
* **取得 VC 綁定資訊**：`GET /api/tickets/getVcQrcode/{code}`
    * 驗證`code`的有效性，並呼叫外部數位憑證服務 (DigitalCredentialService) 發行 VC，回傳 QR Code 和 Deep Link 供錢包 App 綁定。
* **查詢 VC 綁定狀態**：`GET /api/tickets/check-status/{orderId}`
    * 前端輪詢此 API 以確認使用者是否已使用錢包 App 掃描 QR Code 並完成綁定。成功後，將票券狀態更新為 `ACTIVE`。
* **票券交易/取消**：`POST /api/tickets/ticketTrading`
    * 接收 `mode`（TRADING 或 CANCEL）。
    * 產生一個 VP (Verifiable Presentation) 驗證請求的 QR Code。
    * 啟動一個非同步服務 (`VpAsyncService`) 輪詢驗證結果，確認使用者身份後，將票券狀態更新為 `TRADING` 或 `ACTIVE`。
* **查詢交易狀態**：`GET /api/tickets/status`
    * 依 `tradeUuid` 查詢票券的目前狀態（例如：TRADING, ACTIVE 等）。
* **撤銷 VC**：`POST /api/tickets/revokeVc/{vcStatusCode}`
    * 根據票券的 `vcStatusCode` 找到對應的 `cid` (Credential ID)，並呼叫外部服務撤銷此 VC，最終將狀態設為 `REVOKED`。

## 核心技術

* **Java**: 21
* **Spring Boot**: 3.4.10
* **資料庫**: PostgreSQL
* **資料存取**: Spring Data JPA
* **API 文件**: SpringDoc (OpenAPI / Swagger)
* **建置工具**: Maven
* **非同步處理**: `@EnableAsync`

## 外部服務整合

本專案串接了台灣數位發展部 `wallet.gov.tw` 的**沙盒環境**，用於發行 (Issuer) 和驗證 (Verifier) 數位憑證。

* **Issuer Base URL**: `https://issuer-sandbox.wallet.gov.tw`
* **Verifier Base URL**: `https://verifier-sandbox.wallet.gov.tw`

## 如何啟動

### 環境需求

* JDK 21
* Maven (建議使用專案內含的 `mvnw`  wrapper)

### 1\. 設定環境變數

本專案 `dev` 環境設定檔 (`application-dev.yml`) 連接至 Aiven 上的遠端 PostgreSQL 資料庫。

您必須在您的執行環境中設定以下兩個環境變數：

```bash
export DB_USER="your_database_username"
export DB_PASS="your_database_password"
```

### 2\. 執行應用程式

您可以使用 Maven wrapper 直接啟動 Spring Boot 應用程式。

**在 Linux / macOS 上:**

```bash
./mvnw spring-boot:run
```

**在 Windows 上:**

```bash
mvnw.cmd spring-boot:run
```

應用程式啟動後，將運行在 `http://localhost:8080`。

### 3\. (可選) 建置 JAR 檔

如果您想建置可執行的 JAR 檔（如同 GitHub Actions 的做法）：

```bash
# Linux / macOS
./mvnw clean package -DskipTests

# Windows
mvnw.cmd clean package -DskipTests
```

建置完成後，JAR 檔會位於 `target/TicketBox-0.0.1-SNAPSHOT.jar`。

## API 文件

本專案使用 SpringDoc 自動產生 OpenAPI 3.0 文件。

當應用程式啟動後，您可以瀏覽以下網址查看 API 的 Swagger-UI：

[http://localhost:8080/swagger-ui.html](https://www.google.com/search?q=http://localhost:8080/swagger-ui.html)