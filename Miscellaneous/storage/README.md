
### cookie Local Storage  Session Storage

1. Cookie

```
用途：通常用來存放一些需要在伺服器和客戶端之間傳遞的小型資料（如用戶認證資訊）。
大小限制：每個 cookie 的大小限制約為 4KB。
存取範圍：瀏覽器會在每次 HTTP 請求時自動將 cookie 傳送給伺服器，且同一個域名下的所有頁面都可以存取該域名設置的 cookie。
有效期：可以手動設置有效期，根據設置的過期時間來決定 cookie 的存留時間。若不設置有效期，cookie 會在瀏覽器關閉時刪除。
安全性：可以設置 HttpOnly 和 Secure 屬性來提高安全性。HttpOnly 禁止 JavaScript 存取，Secure 只允許在 HTTPS 連接下傳輸。
```

2. Local Storage
```
用途：用來在瀏覽器上長期儲存資料。通常用來存放一些客戶端端應用程式的配置或使用者偏好設定。
大小限制：各個瀏覽器一般支援 5MB 左右的儲存空間。
存取範圍：同一個域名下的所有頁面可以存取。
有效期：資料會永久儲存在瀏覽器上，除非使用者手動清除或透過程式清除。
安全性：資料會持久保存在本地，即便重啟瀏覽器也不會消失，但沒有自動傳送到伺服器的機制，且比 cookie 的安全性稍低，因為沒有 HttpOnly 屬性。
```
3. Session Storage
```
用途：用來在瀏覽器的「會話」期間儲存資料。通常用來存放與當前瀏覽器會話相關的臨時資料。
大小限制：各個瀏覽器一般支援 5MB 左右的儲存空間。
存取範圍：只在同一個瀏覽器窗口的同一個標籤頁中有效，不同標籤頁或窗口無法共享。
有效期：資料會在瀏覽器的「會話」結束時（通常是關閉標籤頁或瀏覽器時）刪除。
安全性：與 localStorage 類似，沒有內建的安全機制如 HttpOnly 屬性。
```
總結：
Cookie：適合儲存需要在伺服器和客戶端間傳遞的小型資料，具備自動傳送到伺服器的特性。
Local Storage：適合長期存放大量的客戶端資料，不會自動傳送到伺服器。
Session Storage：適合臨時儲存和當前會話相關的資料，會在會話結束時清除。

### indexDB

```
IndexedDB 是一種在瀏覽器中用於儲存大量結構化資料的 NoSQL 資料庫，允許網頁應用程式離線時仍能夠儲存和檢索資料。它比 localStorage 和 sessionStorage 更強大，適合處理大量資料或更複雜的結構化資料。

IndexedDB 的特點：

1. 儲存大量資料：IndexedDB 可以儲存大量的資料，遠超過 localStorage 和 sessionStorage 的 5MB 限制，具體的容量限制由瀏覽器決定，且在使用大量空間時，可能會提示使用者授權。

2. 支援結構化資料：IndexedDB 可以儲存任何類型的 JavaScript 資料，包括物件、陣列、字串、日期、數字等。這使它非常適合儲存結構化的資料（例如資料表格、複雜的物件）。

3. 離線存取：IndexedDB 可以用於離線應用程式，允許應用程式在沒有網路連線的情況下讀寫本地資料，當連線恢復時再同步到伺服器。

4. 非同步 API：IndexedDB 主要使用非同步 API，這意味著操作不會阻塞主執行緒，適合在網頁上執行大量資料操作而不影響使用者體驗。

5. 事務支援：IndexedDB 支援 ACID 事務（原子性、一致性、隔離性、持久性），確保資料操作的完整性。例如，讀寫操作可以被視為一個不可分割的單元，要麼全部成功，要麼全部失敗。

6. 索引支援：可以在資料庫的不同欄位上建立索引，以便快速查詢特定資料，類似於傳統的 SQL 資料庫。

7. IndexedDB 的結構

資料庫（Database）：IndexedDB 的資料存儲在資料庫中，可以有多個資料庫，每個資料庫是獨立的。

物件存儲（Object Store）： 資料庫中的資料是儲存在物件存儲（類似於 SQL 的資料表）中。物件存儲內的每一筆資料都有一個唯一的 key 用來識別。
索引（Index）：為了加快查詢速度，可以在物件存儲的特定欄位上建立索引，方便根據不同欄位來進行搜尋。
事務（Transaction）：所有的讀取和寫入操作必須在事務中進行，事務確保資料的完整性。

IndexedDB 的應用場景：
離線網頁應用程式：如 Progressive Web Apps（PWA）可以使用 IndexedDB 儲存大量資料，並在無網路狀態下工作。
複雜資料儲存：適合存放如使用者生成的內容、應用程式設定檔、緩存 API 回應等大量資料。
多媒體內容存取：可以儲存圖片、影片、檔案等二進制數據。
```
