## Curry


#### example
```

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'

```

#### curry
```

反覆將變數儲存 直到參數數量相等
fn.length 代表傳入的 function 有幾個參數
func.call(thisArg[, arg1[, arg2[, ...]]]) 將參數一個一個帶
func.apply(thisArg, [argsArray]) 將參數用一個 array 帶

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } 
    return function(...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}

```
