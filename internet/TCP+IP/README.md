
## TCP/IP

### IP
```
Internet Protocols
主要作用: 兩邊主機的路由和尋址並進行傳送
```

### TCP
```
Transmission Control Protocols
主要作用: 在不可靠的網路傳輸中 提供確保正確傳輸的功能
目前幾乎所有 http 流量都使用 TCP 進行傳輸

1. 丟包重發
2. 雍塞控制
3. 確保數據完整
```

#### 三方交握

```

任何使用 TCP 的連線都需要使用三方交握建立連線 

SYN (Synchronize sequence numbers)
如果有設置，才發出連線請求，用來同步 序列號。

ACK (Acknowledgment field significant)
如果有設置，使 確認號欄位 有效。


Client -> Server
傳送 SYN = 1 和隨機數字 seq 到 server
server 了解要和 Client 建立連線

Client <- Server
Server 回傳 SYN = 1, ACK = 1 , ack number = seq + 1 , seq = random()

Client -> Server
檢查 ack number 是否正確 和 ACK 是否 = 1
正確即傳送
ACK = 1, ack number= server seq + 1,ACK=1

結束即建立連線
```

#### TCP 擁塞
```

TCP 擁塞代表網絡中數據傳輸過多，超過了網絡設備或路徑的處理能力，導致數據包丟失、延遲增加等問題

```

#### TCP 壅塞控制解法

1. 流量控制
```
主要目的: 預防發送端送出過多資料到接收端的機制

在傳送機制上 多加緩衝區大小 rwnd 避免傳送端回傳過多資料

```

2. 慢啟動
```
主要目的: 動態的增加發送端可傳輸的資料量 

參數名稱 cwnd: 發送端對接收端的資料量限制

最大可傳輸資料會取 rwnd 和 cwnd 中的最小值

運作方式:
RTT（Round-Trip Time，往返时间）是指从发送端发送数据到接收端，并接收到接收端的确认（ACK）所经历的时间
每經過一個 RTT cwnd 即 * 2

ssthresh（Slow Start Threshold，慢启动阈值）是拥塞控制机制中的一个关键参数，它决定了 TCP 连接从“慢启动”阶段切换到“拥塞避免”阶段的时间点。

cwnd 超過 ssthresh 進入 壅塞預防階段

```

3. 壅塞預防
```

當 cwnd 超過 ssthresh 或有資料丟失時進入
主要目的: 將 cwnd 由指數增長改為線性增長

```

#### 關閉連線

```

TCP 連線的關閉過程稱為「四次握手」(Four-Way Handshake)。它涉及發送和接收特定的 TCP 封包來安全地終止連接。關閉流程分為以下四個步驟：

1. 第一次握手 (FIN):
client端發送一個 FIN（Finish）封包，告知 server 端它不再發送數據，並希望關閉連接。此時，client端進入 FIN_WAIT_1 狀態。

2. 第二次握手 (ACK):
server 端收到 FIN 後，回覆一個 ACK 封包，確認收到了對方的關閉請求。此時，server端仍然可以繼續傳送數據，而client端進入 FIN_WAIT_2 狀態，等待最終的關閉確認。

3. 第三次握手 (FIN):
server 端在完成它的數據傳輸後，也會發送一個 FIN 封包，表示它也要關閉連接。這時，server 端進入 CLOSE_WAIT 狀態，而client端收到這個 FIN 後進入 TIME_WAIT 狀態。

4. 第四次握手 (ACK):
client端收到 FIN 後，回覆一個最終的 ACK，確認收到了關閉請求。這時，主動方進入 TIME_WAIT 狀態，等待一段時間以確保被動方也能夠完全接收到 ACK，然後最終關閉連接，進入 CLOSED 狀態。

```
