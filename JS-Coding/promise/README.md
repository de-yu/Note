
### 實作 Promise

```

在實作 Promise 中首先要面對的問題

範例:

const b = new Promise((resolve) => {
  console.log('hi')
  resolve(5)
});

b.then((value) => {
  console.log(value)
});

在一般情況下 出現 hi 後就會立即執行 resolve
根本等不到 then 的 function

這種時候就要使用一個 js api

queueMicrotask
這個 api 會將執行動作放入 micro task 中執行

class APromise {
  constructor(executor) {
    executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
  }

  resolveFunc(value) {
    this.resolveValue = value;
    queueMicrotask(() => {
      this.onFulfilled(value);
    })
  }

  rejectFunc(value) {
    this.rejectValue = value;
    queueMicrotask(() => {
      this.onRejected(value);
    })
  }
  
  then(onFulfilled = undefined, onRejected = undefined) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
}

```
