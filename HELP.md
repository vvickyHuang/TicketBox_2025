# 🎟️ 數位憑證票務系統開發落地指南

## 🧩（1）前後端分工概要表

| 階段 | 前端 | 後端 |
|------|-----------|-----------|
| **會員註冊** | 顯示註冊表單 → 送 `memberId/password` → 顯示發行的 VC QR code | 產生會員紀錄 → `/api/qrcode/data` 發會員VC → 回傳 `transactionId`、`qrCode` |
| **領取會員VC** | 使用者掃描 QR code | `/api/credential/nonce/{transactionId}` 查詢VC → 解析 JWT → 取得 `holderDid`、`cid` → 驗簽 & 存DB |
| **購票（訂單）** | 前端送出：會員ID、活動代號、座位、金流成功 | 驗證金流 → 建立 `orderUuid` → 存DB（status=PAID） |
| **發票券VC** | 顯示票券 QR code 讓使用者掃描 | `/api/qrcode/data` 建立票券VC → 回傳 QR code → 等掃描後 `/api/credential/nonce/{tx}` 查詢 |
| **驗票入場** | 使用者 App 出示 VP | Gate 驗簽 JWT（用 `jku` 抓公鑰）→ 檢查 VC 有效期、未撤銷、座位正確 |
| **退票/作廢** | 顯示退票按鈕 | `PUT /api/credential/{cid}/revocation` 撤銷票券VC |
| **二手轉售** | 顯示「轉售給買家」QR → 買家掃描 | 驗舊票券VC、驗新金流VP → revoke 舊VC → 發新VC 給買家 |

---

## 🔄（2）主要 API 串接流程

| 流程階段 | 你的伺服器 API | 沙盒 API | 備註 |
|-----------|----------------|-----------|------|
| 建立會員VC | `/member/register` | `POST /api/qrcode/data` | 回傳 `transactionId` 給前端 |
| 查會員VC狀態 | `/member/vc/verify/{tx}` | `GET /api/credential/nonce/{tx}` | 解析 JWT → 儲存 `holderDid` |
| 購票 | `/order/create` | （自行）金流API | 產生 `orderUuid` |
| 發票VC | `/ticket/issue` | `POST /api/qrcode/data` | 建立票券VC QR code |
| 查票VC狀態 | `/ticket/check/{tx}` | `GET /api/credential/nonce/{tx}` | 解析 JWT，取 `jti` 作為 `cid` |
| 撤銷票VC | `/ticket/revoke/{cid}` | `PUT /api/credential/{cid}/revocation` | 退票/轉售前使用 |
| 入場驗證 | `/gate/verify` | （選用）`/api/oidvp/result` | 可自行驗簽 VC / VP |
| 查狀態列表 | `/statuslist/update` | `GET credentialStatus.id` | 下載 status list 防離線驗票失效 |

---

## 🗄️（3）資料庫最小設計

### Table: `member`
| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | UUID | 系統內會員ID |
| `holderDid` | VARCHAR | DID:key 格式，VC 內的 sub |
| `vcCid` | VARCHAR | 會員VC的 CID（jti） |
| `createdAt` | TIMESTAMP | 建立時間 |

### Table: `order`
| 欄位 | 型別 | 說明 |
|------|------|------|
| `orderUuid` | UUID | 唯一訂單編號 |
| `memberId` | UUID | 對應會員ID |
| `amount` | NUMERIC | 金額 |
| `status` | VARCHAR | PENDING / PAID / REFUNDED |
| `createdAt` | TIMESTAMP | 建立時間 |

### Table: `ticket`
| 欄位 | 型別 | 說明 |
|------|------|------|
| `cid` | UUID | 票券 VC 的唯一識別碼（從 jti 取出） |
| `orderUuid` | UUID | 對應訂單 |
| `memberId` | UUID | 對應會員 |
| `holderDid` | VARCHAR | 持有人DID |
| `seat` | VARCHAR | 座位（區/排/號） |
| `status` | VARCHAR | active / revoked |
| `issuedAt` | TIMESTAMP | 發行時間 |
| `expiredAt` | TIMESTAMP | 到期時間 |

### Table: `vc_log`（選擇）
| 欄位 | 型別 | 說明 |
|------|------|------|
| `cid` | UUID | 對應VC |
| `vcJwt` | TEXT（AES加密） | 原始JWT憑證 |
| `issuerDid` | VARCHAR | 發行者 |
| `holderDid` | VARCHAR | 持有人 |
| `kid` | VARCHAR | 簽章金鑰ID |
| `verifiedAt` | TIMESTAMP | 驗簽時間 |

---

## ⚙️ 驗簽步驟摘要（後端）

1. 解析 JWT → header 取 `jku`, `kid`, `alg`。
2. GET `jku` 抓取 JWKs JSON。
3. 依 `kid` 取對應 key。
4. 用 ES256 驗簽 JWT。
5. 驗簽成功 → 代表 VC 未被竄改。
6. payload 內可取：
    - `sub`：持有人DID
    - `jti`：VC唯一編號（cid）
    - `credentialStatus`：狀態列表
    - `exp`：有效期

---

## 🔐 安全守則

- AccessToken 僅後端保存；前端永不直接呼叫發行端 API。
- `holderDid`、`cnf.jwk` 可安全儲存（公鑰識別，不含私鑰）。
- 若需存 JWT 憑證，請以 AES-256-GCM 加密。
- 系統內部交易鍵請使用 `orderUuid`，**不要使用 transactionId**（它是一次性發卡用 ID）。
- 公鑰 JWKs（`jku`）可快取 1 小時，減少請求延遲。
