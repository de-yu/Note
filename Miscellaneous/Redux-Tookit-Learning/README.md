### Redux-toolkit

Redux-toolkit 主要分為3個部分
1. Redux: 狀態管理工具
2. reselect: 從 state 中取得並整理資料
3. RTK Query: 取得資料和快取資料

使用時機：

1. 透過建立 flux 資料流 串接 API 資料

```

Redux 中建立 api 初始資料
進入畫面時會透過 selector 取得資料
此時 API 還未回傳資料 會使用 redux 中的初始資料進行渲染

等待 API 回傳後
selector 會重新取得資料 並再重新渲染一次畫面

會建立初始資料的原因是 避免在第一次 selector 回傳資料時 出現 undefined

```
2. 在流程中需要在不同畫面中 共用資料的情況

```

舉例: 有各種不同的工作 要從一群人中去分派

先選擇工作 再決定分派給誰
需要將工作 在 redux 中儲存 在分派動作結束後 將資料一併送到 api

```


3. 多個流程中有相似的步驟 藉由 redux 進行步驟的共用

```

舉例: 有各種不同的工作 要從一群人中去分派
工作雖不同 但分派的動作是相同的

可以將分派的動作 獨立成一個 store
後續增加新工作時 可共用儲存邏輯

```

### userList\page.tsx

```
初始透過 selectUserList 取得資料
selector 中透過  userApi.endpoints.getUserList.select()(state)?.data
這個方式可以從 rtk 自動建立的 cache 中取得資料

如果這個 cache 為 undefined
就回傳 userSlice 中的 list

等待 api 回傳
就使用 userApi.endpoints.getUserList.select()(state)?.data 回傳的資料

```

### userDetail\[id]\page.tsx

```

rtk 快取的使用方法

lib\api\UserApi.ts

透過 providesTags 設定好要使用的 tag
在 query 類動作中設定 providesTags
在 mutation 動作中設定 invalidatesTags

若進行 mutation 後有被設定 providesTags 有被設定到 invalidatesTags
query 會自動重打

```