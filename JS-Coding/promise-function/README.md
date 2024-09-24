
### Promise.all

```

功能： 同時執行所有 Promise 直到全部成功 或任一失敗

function all(promises) {

  const responseArr = new Array(promises.length);
  const solveArr = new Array(promises.length).fill(false);

  if(promises.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    for(let i=0;i<promises.length;i++) {

      if(promises[i] instanceof Promise) {
        promises[i].then((response) => {
          responseArr[i] = response
          solveArr[i] = true;

          if(!solveArr.includes(false)) {
            resolve(responseArr);
          }
        }).catch((err) => {
          reject(err)
        })
      } else {
        responseArr[i] = promises[i];
        solveArr[i] = true;
      }
      
    }
  })
}

```

### Promise.allSettled


```

功能： 全部執行完才回傳 使用 status 參數 表示狀態失敗或成功


function allSettled(promises) {

  const responses = new Array(promises.length);
  let sumPromise = promises.length;

  if (promises.length === 0) {
    return Promise.resolve([])
  }
  return new Promise((resolve) => {
    for(let i=0;i<promises.length;i++) {
      if(promises[i] instanceof Promise) {
        Promise.resolve(promises[i]).then((response) => {
          responses[i] = {status: 'fulfilled', value: response}
          sumPromise-=1;
        }).catch((error) => {
          responses[i] = {status: 'rejected', reason: error}
          sumPromise-=1;
        }).finally(() => {
          if(sumPromise === 0) {
            resolve(responses)
          }
        })
      } else {
        responses[i] = {status: 'fulfilled', value: promises[i]}
        sumPromise-=1;

        if(sumPromise === 0) {
          resolve(responses)
        }
      }
    }
  })
}


```

### Promise.any

```

功能： 有一個成功即回傳 錯誤不回傳

function any(promises) {

  if (promises.length === 0) {
    return Promise.resolve([])
  }

  let allPromises = promises.length;
  let errors = []


  return new Promise((resolve, reject) => {
    for(let i=0;i<promises.length;i++){
      promises[i].then((response) => {
        resolve(response)
      }).catch(err => {
        errors[i] = err
        allPromises--;

        if(allPromises === 0) {
          reject(new AggregateError(
            'No Promise in Promise.any was resolved', 
            errors
          ))
        }
      })
    }
  })
}

```

### Promise.race

```

功能： 任一個 Promise 成功或失敗即回傳

function race(promises) {

  if (promises.length === 0) {
    return Promise.resolve([])
  }
  return new Promise((resolve, reject) => {
    for(let i=0;i<promises.length;i++) {
      promises[i].then(resolve, reject)
    }
  })
}

```
