## 瀏覽器的工作原理

### 1. DNS 查詢

瀏覽器從域名服務器發起 DNS 查詢請求 得到 IP 位址

### 2. TCP 透過 3方交握 建立連線

### 3. TLS 安全協議

### 4. 解析 Parse


#### Parsing HTML

```

解析 HTML 並建構 DOM ( Document Object Model) Tree
透過 HTML Tag 建立的 Tree 描述了文件的結構
Tree 中 反映了不同的 Tag 中的層級關係
DOM 節點越多 建構 DOM 的時間越長

當解析中遇到css 或圖片時會請求資源並繼續解析
但遇到 script 標籤會阻塞渲染 並停止解析

```

#### Preload Scanner

```
預加載器會先掃描外部的引用資源並先下載
```

#### Parsing CSS

```
建立 CSSOM Tree 和 DOM 結構類似
CSSOM 中包含了 所有樣式
css是阻塞渲染的 在瀏覽器接收完css前 內容無法渲染

從性能的角度來說 更少的特定選擇器相對更快
但對瀏覽器來說 這點消耗非常小

```

#### Render Tree

```
為了建立渲染樹 瀏覽器從 DOM 根節點開始決定哪些 CSS 規則被添加
而有 display: none 和 head 元素不會被放進 render tree 中

```

#### Layout
```

計算每個節點的尺寸和位置
第一次確認節點尺寸和位置稱為 Layout
隨後有相關變化稱為 Reflow

```


#### Paint
```

將節點繪製到畫面上
將每個元素轉化為實際的像素
包含了背景色 圖片 文字等

```
#### compositing

```

將元素以不同層進行繪製
並合成在畫面上

```


### Reflow 和 Repaint

```

Reflow 
如果變動導致畫面需要更新
width height 等
當有一個節點變動 就需要重新計算畫面中所有元素的位置和長寬

Repaint
變動不影響布局的屬性時
color outline visibility等

```




