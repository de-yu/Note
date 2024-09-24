## BigFrontend - Implement a general memoization function - `memo()`

```

題目： 近似於 React.memo
如果帶入相同的參數則不重新計算結果

const func = (arg1, arg2) => {
  return arg1 + arg2
}
const memoed = memo(func)
memoed(1, 2) 
// 3, func is called
memoed(1, 2) 
// 3 is returned right away without calling func

```


```

function memo<T extends (...args: any[]) => any>(func: T, resolver?: (...args: Parameters<T>) => string): T {
  // your code here
   let map = new Map<string, any>()

  function resolve (args: Parameters<T>): string {
    if(resolver === undefined) {
      return args.toString()
    }
    return resolver(...args)
    
  }
  
  const memoizedFunc = function(this: any, ...args: Parameters<T>): ReturnType<T> {
    if(map.has(resolve(args))) {
      return map.get(resolve(args))
    } else {
      const value = func.call(this, ...args)
      map.set(resolve(args), value)
      return value;
    }
  }

  return memoizedFunc as T;
}



```
