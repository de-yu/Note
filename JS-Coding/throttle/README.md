## throttle 節流

```
定義： 在一段時間內只會執行一次觸發事件的回調 (callback) 函式，若在這之中又有新事件觸發，則不執行此回調函式
適合用在那些頻繁觸發的事件中，確保不會造成過多的性能損耗，特別是在使用者交互、DOM 操作以及網路請求等場景

使用場景
1. infinite scroll
2. 捲動事件（scroll）
3. 視窗調整大小事件（resize）

```


### 簡單版

```

lodash throttle 實作
無 leading trailing 版本

function throttle(func, wait) {

  let accept = true;
  let temp = null;

  const run = () => {
    
      setTimeout(() => {  // 時間結束會做最後一次傳進 func 的參數
        if(temp !== null) {
          func(temp)
          temp = null;
        }
        accept = true;
      }, wait)
  }
  return (...args) => {
    if(accept) {
      accept = false
      
      func(args);  // 會先做一次
      run()
    } else {
      temp = args; // 當在區間內重複呼叫 新的參數取代舊參數
    }
  }
}

```

### 有參數版

```

有 leading trailing 版本
leading 控制最初的 function 觸發
trailing 控制結束的 function 觸發
兩個參數都 false 則不會有任何動作

function throttle(func, wait, option = {leading: true, trailing: true}) {

  let temp = null;
  let first = true;

  const run = () => {
    setTimeout(() => {
      if(option.trailing && (temp !== null)) { // trailing 判斷結束的 func
        func(temp)
        temp = null;
        run()
      } else {
        first = true;
      }
    }, wait)
  }

  return (...args) => {
    temp = args;
    if(option.leading && first) { // leading 判斷最開始的 func
      func(temp)
      temp = null;
    }
    if(first) {
      first = false;
      run();
    }
  }
}

```
