
## TCP/IP

### IP
```
Internet Protocols
主要作用: 兩邊主機的路由和尋址並進行傳送
```

### TCP
```
Transmission Control Protocols
主要作用: 在不可靠的網路傳輸中 提供可靠的抽象層
目前幾乎所有 http 流量都使用 TCP 進行傳輸

TCP 负责在不可靠的传输信道之上提供可靠的抽象层，向应用层隐藏了大多数网络
通信的复杂细节，比如丢包重发、按序发送、拥塞控制及避免、数据完整，等等。
采用TCP 数据流可以确保发送的所有字节能够完整地被接收到，而且到达客户端的
顺序也一样。也就是说，TCP 专门为精确传送做了优化，但并未过多顾及时间。正
如稍后我们会谈到的，这一点也给优化浏览器Web 性能带来了挑战。

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

TCP 拥塞是指在计算机网络中，当网络带宽有限时，传输控制协议（TCP）所面临的网络拥塞现象。当网络中的数据流量超过了可用的网络资源（例如带宽或路由器的处理能力）时，会导致网络拥塞，进而引发数据包丢失、传输延迟增加和连接性能下降。

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
