## Debounce

```

定義：將多次操作優化為，只在最後一次執行

使用情境：輸入框推薦

```

### 簡單版本

```
如果反覆的 call function 就重新計時
直到計時結束執行

function debounce(func, wait) {
  let id = 0;
  return (arg) => {
    clearTimeout(id);
    id = setTimeout(() => {
      func(arg)
    }, wait)
    
  }
}

```

### 有參數的版本

```

leading 控制最初的 function 觸發
trailing 控制結束的 function 觸發
兩個參數都 false 則不會有任何動作

function debounce(func, wait, option = {leading: false, trailing: true}) {

  let id = 0;
  let waiting = false;
  return (arg) => {

    if(!waiting && option.leading) { // 第一次 call func
      func(arg)
      waiting = true;
    } else {
      clearTimeout(id);
      id = setTimeout(() => {
        if(option.trailing) { // 結束 call func
          func(arg)
        }
        waiting = false;
      }, wait)
    }
  }
}

```
