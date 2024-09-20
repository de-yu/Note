## map

```
實作 Array.map

在這邊遇到幾個有趣的問題
for..in 會將可列舉屬性列出 包含 myMap 這個 protoType 的方法

new Array 宣告完 Array 後
Array 的值雖然是 undefiend 但
如果 console 會出現叫 empty item 的東西 
是無法被列舉出來的屬性 

Array.prototype.myMap = function(func, thisObj) {
  const newArr = new Array(this.length);
  for(const index in this) {
    if(index === 'myMap') {
      continue;
    }
    newArr[index] = (func.call(thisObj, this[index], Number(index), this))
  }
  return newArr
}


```
