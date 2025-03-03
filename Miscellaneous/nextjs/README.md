
# Next.js

### Serverless

Serverless 並不是真的「沒有伺服器」，而是：

    雲端服務商（AWS, Vercel, Google Cloud, Azure） 代替你管理伺服器。
    你的應用程式拆分成獨立的函數（Function-as-a-Service, FaaS），每當有請求時，雲端會自動啟動函數來處理。
    請求完成後，函數會自動結束，不會佔用多餘資源。

📝 Serverless 運作流程

1️⃣ 用戶發送請求  
2️⃣ 雲端服務（如 AWS Lambda）啟動對應的 Serverless 函數  
3️⃣ 函數執行（讀取資料庫、調用 API、回應請求）  
4️⃣ 完成請求後，函數關閉，釋放資源  

🔹 Serverless 的優點

✅ 無須管理伺服器

    不需要手動維護伺服器，省去 DevOps 工作。

✅ 按需執行，降低成本

    只在請求時運行，無請求時不佔用資源，節省伺服器費用。

✅ 自動擴展

    Serverless 會根據流量自動擴展，無論是 1 個或 100 萬個請求都能應對。

✅ 全球分佈，低延遲

    可自動在全球多個地點部署（如 Edge Functions），提升性能。

🔹 Serverless 的缺點

❌ 冷啟動（Cold Start）

    如果 Serverless 函數長時間未執行，下一次請求時可能有冷啟動延遲（通常 100ms ~ 1s）。

❌ 無法持續運行

    Serverless 適合短時間執行的任務（AWS Lambda 最長 15 分鐘）。
    無法執行長時間運行的後台任務，如影片轉碼、大型數據處理。

❌ 調試較難

    由於函數是動態執行的，難以本地開發與除錯。


### 渲染方式

#### CSR - Client Side Rendering

運作方式：

    瀏覽器加載一個空的 HTML 檔案，並透過 JavaScript（通常是 React）在客戶端請求數據，然後動態渲染頁面。
    也就是說，頁面的 HTML 是在瀏覽器端生成的，而不是伺服器提供完整的 HTML。

優點：  
✔️ 初次加載後，應用程式運行流暢（因為是單頁應用 SPA）  
✔️ 適合需要大量用戶互動的應用，如網頁應用（如 Gmail、Facebook）  
✔️ 伺服器負擔低（因為主要運算發生在瀏覽器）

缺點：  
❌ 初次載入較慢，因為需要下載 JavaScript 並執行  
❌ SEO 不佳（爬蟲可能無法讀取未渲染的內容，雖然可以透過 Next.js、Nuxt.js 或 Prerendering 解決）  

#### SSR - Server side Rendering

運作方式：  

    每次使用者請求頁面時，伺服器會即時生成 HTML，然後發送給用戶端。
    這意味著每次載入頁面時都會重新請求數據，適合需要最新數據的頁面。

優點：  
✔️ SEO 友善（因為伺服器返回完整 HTML）  
✔️ 適合動態內容，例如即時數據顯示（例如新聞、天氣）  

缺點：  
❌ 每次請求都要等待伺服器處理，可能影響效能  
❌ 伺服器負擔較重  

#### SSG - Static Site Generation

運作方式：

    頁面在編譯（build）時預先生成 HTML，並在請求時直接提供靜態文件。
    適合內容固定、不常變更的頁面（例如部落格、說明文件）。

優點：  
✔️ 載入速度快（因為是靜態頁面）  
✔️ 伺服器負擔低，CDN 可緩存  

缺點：  
❌ 無法即時更新數據（除非重新部署）  


#### ISR - Incremental Static Regeneration

運作方式：

    基本上是 SSG + 定時更新，可在特定時間後自動重新生成靜態頁面。
    允許靜態頁面在無需重新部署的情況下獲得新數據。

優點：  
✔️ 兼具 SSG 的速度與 SSR 的即時更新能力  
✔️ 伺服器負擔比 SSR 低（因為還是以靜態頁面為主）  

缺點：  
❌ 初次請求可能會得到舊數據（但下一次會更新）  


### 資料處理方式

#### getServerSideProps （SSR - 伺服器端渲染）

🔹 執行時機： 每次請求時在伺服器端執行  在 app 資料夾結構下無法使用
🔹 使用場景： 需要即時數據的頁面，如個人化儀表板、用戶動態數據  

運作方式

    每次用戶請求該頁面時，都會在伺服器端執行 getServerSideProps，然後將數據傳遞給頁面
    適用於需要即時數據的頁面（例如用戶專屬內容、即時資訊）

✅ 優點：

    確保數據始終是最新的
    SEO 友善（伺服器回傳完整 HTML）

❌ 缺點：

    每次請求都會執行，可能會影響效能
    伺服器負擔較重

#### getStaticProps（SSG - 靜態生成）

🔹 執行時機： 編譯（build）時執行一次  在 app 資料夾結構下無法使用
🔹 使用場景： 內容固定、變更不頻繁的頁面，如部落格文章、說明文件  

運作方式

    getStaticProps 會在 build 時執行一次，產生靜態 HTML
    適用於不會頻繁變更的內容（例如產品頁面、部落格文章）

✅ 優點：

    載入速度快（因為是靜態頁面）
    伺服器負擔低（CDN 可快取靜態 HTML）
    適合 SEO（靜態內容可被爬蟲索引）

❌ 缺點：

    數據不會即時更新（需要重新部署才能獲取新數據）
    不適合即時變動的內容

#### getStaticPaths

getStaticPaths 會：

    返回所有可能的路由參數（params）。 在 app 資料夾結構下無法使用
    讓 Next.js 在構建時預先生成這些頁面的靜態 HTML。

getStaticPaths 需要搭配 getStaticProps，才能為每個動態路由提供對應的內容。

#### generateStaticParams（動態路由的 SSG） 

🔹 執行時機： 編譯（build）時，用於 動態路由 預先生成靜態頁面  ( app 文件夾使用 )
🔹 使用場景： 動態 URL 且內容可預測的情境，如部落格文章、商品頁  

運作方式

    generateStaticParams 用於 動態路由 (pages/products/[id].tsx)
    它的作用是提供哪些動態路徑應該預先生成
    與 getStaticProps 搭配使用

✅ 優點：

    讓 Next.js 知道哪些動態頁面應該靜態生成
    搭配 getStaticProps，可實現高效的 靜態頁面預渲染
    適合內容較多但不常變動的動態路由（如產品詳情頁）

❌ 缺點：

    無法處理所有動態路由（如果 fallback: false，則未預生成的頁面會 404）

### use client vs use server

#### use client

🔹 用法： 在組件的第一行加上 'use client'  
🔹 作用： 讓該組件 在瀏覽器執行（CSR），可以使用 useState、useEffect、事件監聽等瀏覽器 API。  
🔹 適用場景： 互動式 UI、表單、按鈕、狀態管理（Redux、Zustand）  

#### use server

🔹 用法： use server 主要用來標記 伺服器端函數，這些函數不能直接在瀏覽器執行。  
🔹 作用： 讓函數在伺服器端執行，可以直接與資料庫、API 互動，避免將敏感數據暴露給客戶端。  
🔹 適用場景： 直接連接資料庫、處理表單請求、後端 API 調用 

### middleware

Middleware 是 Next.js 13+ 提供的一種中間件機制，它允許你在 請求到達 API 或頁面前，進行攔截、修改或重定向。Middleware 運行於 Edge Runtime（邊緣運算），比傳統 Serverless 快速且輕量。

📌 Middleware 的作用

    在請求到達 API 或頁面之前執行邏輯
    檢查請求（身份驗證、權限控制）
    修改回應（新增 headers、重寫路由）
    進行重定向（登入狀態、A/B 測試）

 Middleware 適用於：

    身份驗證（Authentication）
    權限管理（Authorization）
    動態重寫（Rewrite）
    A/B 測試
    安全性強化（Security Headers）
    國際化（i18n）

### Prefetching

Prefetching（預先加載）是 Next.js 的一個優化機制，用來在用戶點擊鏈接前，預先加載對應的頁面，從而提升頁面切換的速度，讓導航幾乎感覺是即時的。

🚀 簡單來說：

    Next.js 會在瀏覽器閒置時，自動預載 next/link 內的頁面。
    當用戶真正點擊連結時，頁面已經在快取內，瞬間顯示內容。

1️⃣ 預加載 next/link 內的頁面

如果你使用 next/link 來導航，Next.js 預設會 prefetch 該頁面：

2️⃣ 只會在可視區域（Viewport）內的 Link 自動預加載

Next.js 不會一次加載所有頁面，而是僅預加載用戶可見的 Link。

📌 例如：

    若 About 連結在螢幕範圍內，Next.js 會自動預加載 /about。
    若 Contact 連結在畫面外（需要捲動才能看到），則它不會立即預加載。

3️⃣ 只會對 getStaticProps (SSG) 或 getServerSideProps (SSR) 頁面有效

Prefetching 只適用於 SSG 和 SSR 頁面，對於 CSR（Client-side Rendering）不會有影響。


### next/* package

Next.js 提供了一些官方的 next/* 開頭的內建模組（packages），這些模組幫助開發者更方便地處理路由、影像優化、伺服器端功能等。以下是一些常見的 next/* 模組及其作用：

1️⃣ next/link（客戶端導航）

用於在 Next.js 頁面內進行客戶端導航（Client-side Navigation），它比傳統的 <a> 標籤快，因為它支援 Prefetching（預加載）。

2️⃣ next/image（影像優化）

用於處理圖片優化（Image Optimization），例如：

    自動壓縮
    支援 WebP
    只加載視口內的圖片（懶加載）

✅ 自動優化圖片，減少網頁載入時間。
✅ 支援 Lazy Loading，提高效能。

3️⃣ next/router（程式導向導航）

當你需要在 事件處理後 進行動態跳轉時，可以使用 useRouter() 來操作路由。

✅ 適用於按鈕點擊或 API 觸發的導航。
✅ 支援 replace()、back()、query 參數等。

4️⃣ next/head（管理 HTML <head>）

用來在 每個頁面動態設定 <title>、SEO metadata、CSS 代碼等。

✅ 可動態設定 <title>、meta、SEO。
✅ 避免覆蓋整個 _document.tsx 文件的 <head>。

5️⃣ next/script（優化 JavaScript 加載）

用於控制 第三方腳本（如 Google Analytics、Chatbot） 的載入時機（beforeInteractive、afterInteractive、lazyOnload）。

✅ 提高效能，避免阻塞主線程。
✅ 支援延遲加載 strategy 屬性（beforeInteractive、afterInteractive、lazyOnload）。

6️⃣ next/font（自動載入字體）

用於優化字體載入，減少 FOUT（Flash of Unstyled Text），提升頁面載入速度。
✅ 自動加載 Google Fonts，無需手動載入。
✅ 減少 CLS（Cumulative Layout Shift）問題。

7️⃣ next/server（伺服器 API）

next/server 提供 Middleware 和 API Route 相關的工具，例如：

    NextRequest
    NextResponse

✅ 用於權限驗證、重寫請求等。
✅ 在 Edge Runtime 運行，速度更快。

8️⃣ next/auth（NextAuth.js 身份驗證）

用於 處理 OAuth、JWT、Google Login、GitHub Login 等身份驗證。

✅ 內建身份驗證功能，無需自己建構 API。
✅ 支援 OAuth（Google、GitHub、Facebook、Twitter）。

9️⃣ next/dynamic（動態載入組件）

用於 Lazy Loading（懶加載）組件，只在需要時載入，提升效能。
✅ 避免不必要的 JavaScript 載入。
✅ 支援 SSR & CSR 切換（ssr: false 表示只在客戶端載入）。