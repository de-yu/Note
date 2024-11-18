## Event Loop

```
Event loop 可以作為整個 javascript 是以何種機制在運行的名稱

由於 javascript 是單執行緒
所以會透過異步去執行程式碼
若為同步則會導致程式 block

call stack : 執行堆疊
所有 function 會採取後進先出的方式去執行
當函數被呼叫時，它會被推入（push） Call Stack 中。
當函數執行完成後，它會被彈出（pop） Call Stack。

同步的程式碼會直接進入 stack 中 不會進入 queue

macrotask Queue : 一般任務 queue
microtask Queue : Promise 中的 then catch 優先度高於 macrotask

stack 是負責當前的執行任務
queue 儲存等待執行的 function
```
