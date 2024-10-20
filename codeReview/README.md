
## Code Review

> component 最多不超過 3 層  
> 好好瞭解程式的執行順序 - 可以先將想像中的流程寫出來  等寫完再對答案  
> 好好確認設計稿和後端 API 格式盡量在開始前解決問題  
> 所有的 UI 應該都要在 Page 下的 component 可以尋找到  
> 以組合的方式進行開發  


> 這份文件主要的目的是紀錄自己在工作時遇到難以理解的程式碼  
> 將其寫成較易閱讀的形式  
> 並分享一些能將程式碼縮短的技巧  
> 其中也包含了一些個人的習慣

> 使用 js 作為範例
> 也參考一部分 clean code 此書

## if 篇

#### 條件複雜

> 如果 if 中的條件太複雜  
> 新增註解方便理解  
> 說明再判斷什麼東西  

    //must write comment
    if(...&&...&&...) {
    }
    
    
#### 將條件寫清楚

> 當面臨不同條件進行不同處理的情況  
> 如果條件能寫清楚 就盡可能寫出來  
> 不要使用一個 else 帶過


    // type range 1 ~ 5
    function exmaple(type) {
    
        if(type === 1) {
            ...do something
        } else if(type===2 || type === 3) {
            ...do something
        } else {
            ...do something
        }
    }
    
>

    function exmaple(type) {
        if(type === 1) {
            ...do something
        } else if(type ===2 || type === 3) {
            ...do something
        } else if(type ===4 || type === 5){
            ...do something
        }
    }
    
> 如果因為缺少 else 導致錯誤  
> 應該是去思考為何會出現不再條件內的情況  
> 而不是使用一個 else 去彌補錯誤  

#### if 對應不同值

> 如果遇到條件對應不同值的情況  
> 可以選擇用 object 去取代這種情況  

    function sample(choose) {
    
      let result = 0;
      if(choose === 'a') {
        result = 1;
      }else if(choose === 'b') {
        result = 2;
      }    
      return result;
    }

>

    function sample(choose) {
    
      let result = 0;
      let map = {
        a: 1,
        b: 2
      };
      
      if(map.hasOwnProperty(choose)) {
        result = map[choose];
      }
      
      return result;
    }

#### 不需要額外判斷 true false

> 如果變數已經確定是 boolean  
> if 裡不需要再判斷 true or false


    // flag is boolean
    if(flag === true) {
        ...
    }

>

    // flag is boolean
    // It's ok
    if(flag) {
        ...
    }

> 有時候會看到這種

    // flag is boolean
    function () {
        let flag = false; 
        ...
        if(flag === true) {
            return true;
        } else {
            return false;
        }
    }
>
     // flag is boolean
     // It's ok
    function (flag) {
        let flag = false; 
        ...
        return flag;
    }

## function 篇

> 一個function 應該只有一個 return  
> 主要是方便確認 function 的進出點  
> 多個 return 容易導致除錯困難

    function exmaple() {
        if(...condition) {
          return 1;
        } else {
          return 2;
        }
    }
    
>
    
    function example() {
        let result = 2;
        if(...condition) {
            result = 1;
        }

        return result;
    }

> 不使用 flag 參數
> 使用 is... 去代表另一個狀態
> 若過多的flag 參數 將造成程式難以運作

>

    function(isApps) {
      if(isApps) {
        ...
      }else {
        ...
      }
    }

> 不該傳遞 null 和 undefined
> 我會極力避免在資料中出現這兩個東西
> 除非是 api 可能會有這種回傳
> 不然程式會需要增加大量的判斷去檢查這些變數
> 容易造成程式的混亂

## 註解

1. 過於複雜的狀況用註解 解釋行為的原因和目的
2. 特殊的結果或情況
3. 盡量使用程式碼表達意圖而非使用註解