## React 優化

* Component Memoization

```
透過 useMemo useCallback 減少資料的重複計算和創建
```

* Lazy loading

```
透過 lazy suspense
lazy: 當組建需要時才被加載進來
suspense: 處理加載中組件的狀態
```

* server side cache

```
透過將 api 的快取透過 key 或 payload 做為參數將 response 儲存起來 
在短期反覆切換的情框下 減少反覆打 api 的次數
RTK query react query 有類似機制
```

* Reselect selector

```
透過在 selector 中計算整理資料
並透過 selector 的 memo 機制會記得上一次使用的資料
避免在 component 中反覆 render 進行計算

```

* Event Handling

```
透過

Throttle: 在一段時間內只會執行一次觸發事件的回調
使用情境：
1. infinite scroll
2. 捲動事件（scroll）

debounce : 將多次操作優化為，只在最後一次執行
使用情境：輸入框推薦
```

* Virtualized Lists

```
這個技術讓應用程式只需要渲染長列表的某一部分
用以解決列表太長造成的 render 問題

```

* React Profiler

```

這個 plugin 可以用來檢查 render 時造成的效能問題
是在哪個 component 上
 
```
