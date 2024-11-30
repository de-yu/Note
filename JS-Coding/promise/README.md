
### 實作 Promise


在實作 Promise 中首先面對的問題

1. 同步動作時會設定好 resolve 後執行
2. then catch 鏈式結構
3. function 執行和參數傳遞處理


### 1. 同步動作時會設定好 resolve 後執行
```

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

在這個queueMicrotask中的行為
會進入到 microtaskqueue 中
程式會先完成同步的部分
再從 microtaskqueue 取得需要執行的部分

這時套用第一個範例
output:
hi
5

```

### 2. then catch 鏈式結構

```

class APromise {

  constructor(executor) {

    this.thenPromiseResolve = () => {};
    this.thenPromiseReject = () => {};

    executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
  }

  resolveFunc(value) {
    this.resolveValue = value;
    queueMicrotask(() => {
      this.onFulfilled(value);
      this.thenPromiseResolve()
    })
  }

  rejectFunc(value) {
    this.rejectValue = value;
    queueMicrotask(() => {
      this.onRejected(value);
      this.thenPromiseReject();
    })
  }
  
  then(onFulfilled = undefined, onRejected = undefined) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    return new MyPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }
}

透過 this.thenPromiseResolve 將 function 執行下去

```

### 3. function 執行和參數傳遞處理

1. resolve 不執行 2 次
2. executor 中出現 error
3. catch function
4. 靜態方法 resolve reject
5. then 中出現 error
6. 鏈式結構中傳遞參數
7. then 中回傳 promise
8. promise 特別行為

```

1. resolve 不執行 2 次
透過起始狀態 pending
執行 resolve 為 fulfilled
執行 reject 為 rejected

2. executor 中出現 error
初始執行的 function 調整為

  try {
    executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
  } catch(e) {
    this.rejectFunc(e)
  }

3. catch function
直接透過 then 即可

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

4. 靜態方法 resolve reject

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }



```

到目前為止的程式

```

class APromise {

  constructor(executor) {
    this.state = 'pending';
    this.thenPromiseResolve = () => {};
    this.thenPromiseReject = () => {};

    try {
      executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
    } catch(e) {
      this.rejectFunc(e)
    }
  }

  resolveFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'fulfilled';

    queueMicrotask(() => {
      this.onFulfilled(value);
      this.thenPromiseResolve()
    })
  }

  rejectFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'rejected';

    queueMicrotask(() => {
      this.onRejected(value);
      this.thenPromiseReject();
    })
  }
  
  then(onFulfilled = undefined, onRejected = undefined) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    return new MyPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

```

5. then 中出現 error

```

  resolveFunc(value) {
    this.resolveValue = value;
    queueMicrotask(() => {
      try {
        this.onFulfilled(value);
        this.thenPromiseResolve()
      } catch(e) {
        this.thenPromiseReject(e);
      }
    })
  }
```

6. 鏈式結構中傳遞參數
```
  將完成的參數往下傳遞
  let onFulfilledResult = this.onFulfilled(value);
  this.thenPromiseResolve(onFulfilledResult)

  let onRejectedResult = this.onRejected(value);
  this.thenPromiseResolve(onRejectedResult)

```
7. then 中回傳 promise

```

判斷回傳值是不是 promise

  if (onFulfilledResult instanceof MyPromise) {
    onFulfilledResult.then(this.thenPromiseResolve, this.thenPromiseReject);
  } else {
    this.thenPromiseResolve(onFulfilledResult)
  }

  if (onRejectedResult instanceof MyPromise) {
    onRejectedResult.then(this.thenPromiseResolve, this.thenPromiseReject);
  } else {
    this.thenPromiseResolve(onRejectedResult)
  }

```

8. promise 特別行為

```
const b = new Promise((resolve, reject) => {
  reject(1);
});


b.then(d => {
  console.log('then1')
  console.log(d);
}).catch((v) => {
  console.log('catch', v);
  return 2
}).then((g) => {
  console.log('then2' , g)
}).catch(() => {
  console.log('catch 2');
});

試想一下這樣會出現什麼


catch 1
then2 2

也就是說 reject 會找到第一個出現得 catch 進行

所以在 catch 的部分需要調整
再 this.onRejected 這個 function 都是 undefined 時
需要持續傳遞給下一個 rejected
除非能成功執行

queueMicrotask(() => {
    try {
      let onRejectedResult = undefined

      if (this.onRejected !== undefined) {
        onRejectedResult = this.onRejected(value);

        if (onRejectedResult instanceof MyPromise) {
          onRejectedResult.then(this.thenPromiseResolve, this.thenPromiseReject);
        } else {
          this.thenPromiseResolve(onRejectedResult)
        }

      } else {
        this.thenPromiseReject(value)
      }

    } catch (e) {
      this.thenPromiseReject(e);
    }
  })



```

## 完成版

```

class MyPromise {

  constructor(executor) {
    this.state = 'pending';
    this.thenPromiseResolve = () => { };
    this.thenPromiseReject = () => { };

    try {
      executor(this.resolveFunc.bind(this), this.rejectFunc.bind(this));
    } catch (e) {
      this.rejectFunc(e)
    }
  }

  resolveFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'fulfilled';

    queueMicrotask(() => {
      try {
        let onFulfilledResult = undefined
        if (this.onFulfilled !== undefined) {
          onFulfilledResult = this.onFulfilled(value);
        }

        if (onFulfilledResult instanceof MyPromise) {
          onFulfilledResult.then(this.thenPromiseResolve, this.thenPromiseReject);
        } else {
          this.thenPromiseResolve(onFulfilledResult)
        }

      } catch (e) {
        this.thenPromiseReject(e);
      }
    })
  }

  rejectFunc(value) {

    if (this.state !== 'pending') return;
    this.state = 'rejected';

    queueMicrotask(() => {
      try {
        let onRejectedResult = undefined

        if (this.onRejected !== undefined) {
          onRejectedResult = this.onRejected(value);

          if (onRejectedResult instanceof MyPromise) {
            onRejectedResult.then(this.thenPromiseResolve, this.thenPromiseReject);
          } else {
            this.thenPromiseResolve(onRejectedResult)
          }

        } else {
          this.thenPromiseReject(value)
        }

      } catch (e) {
        this.thenPromiseReject(e);
      }
    })
  }

  then(onFulfilled = undefined, onRejected = undefined) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    return new MyPromise((resolve, reject) => {
      this.thenPromiseResolve = resolve;
      this.thenPromiseReject = reject;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

```