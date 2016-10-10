## 展平数组

数组中可以嵌套数组，要嵌套多少层都可以，比如`[1, 2, [[3], 4]]`
这样看起来很不爽，所以我们要把它展开，只留下一层数组: `[1, 2, 3, 4]`
         
**结果：**  

```javascript

flatten([1, 2, 3])                // [1, 2, 3]
flatten([1, 2, [3]])              // [1, 2, 3]
flatten([1, 2, [[3], 4]])         // [1, 2, 3, 4]
flatten([1, [2, [[3], [4]]]])     // [1, 2, 3, 4]

```


### 方法一：普通方法

```javascript
function flattenMd(arr){
    var result=[]
    function flatten(arr){
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                flatten(arr[i]);
            }else{
                result.push(arr[i]);
            }        
        }
    }
    flatten(arr);
    return result;
}
var arr=[1, [2, 3, [4, 5], 6], 7, 8]
console.log(flattenMd(arr));[ 1, 2, 3, 4, 5, 6, 7, 8 ];
```
并没有什么好说的

### 方法二：数组concat方法

传递给concat方法的参数序列中如果包含数组，则会将这个数组的每一项添加到结果数组中，这就使数组的这个方法具有了天然的展开二维数组的能力

```javascript
function flatten2d(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        result = result.concat(arr[i]);
    }
    return result;
}
```
上面的方法还可以进一步简化。我们知道apply方法是可以直接接受数组参数，这样我们连循环迭代都省了。

```js
function flatten2d(arr) {
    return Array.prototype.concat.apply([], arr);
    // return [].concat.apply([],arr);
}
```
但是上述方法只能降低一维。因此我们需要使用迭代：

```js
function flattenMd(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++){
        if(arr[i] instanceof Array) {
            result = result.concat(flattenMd(arr[i]));
        }
        else {
            result.push(arr[i]);
        }
    }
    return result;
}
var arr=[1, [2, 3, [4, 5], 6], 7, 8]
console.log(flattenMd(arr));[ 1, 2, 3, 4, 5, 6, 7, 8 ]
```
还可以使用递归

```js
function flatten(arr) {
  return arr.reduce(function (plane, toBeFlatten) {
    return plane.concat(Array.isArray(toBeFlatten) ? flatten(toBeFlatten) : toBeFlatten);
}, []);
}
```
递归的简化版

```js
flatten = function (arr) {
    return arr.reduce((plane, toBeFlatten) => (plane.concat(Array.isArray(toBeFlatten) ? flatten(toBeFlatten) : toBeFlatten)), []);
}
```
再简化

```js
flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
```
### 方法三：利用ES6的展开符

```js
function flatten(arr) {
  return [].concat(...arr)
}
```
但是只能降低一维 因此使用递归

```js
function deepFlatten(arr) {
    flatten = (arr)=> [].concat(...arr);
    return flatten(arr.map(x=>Array.isArray(x)? deepFlatten(x): x));
}
```
### 方法四：数组join和split方法的结合（只适用于数字数组）

```js
function flattenMd(arr) {
   return arr.join().split(',');   
}
var arr=['1', [null, 3, [4, 5], {K:1}], undefined, 8]
console.log(flattenMd(arr));//[ '1', '', '3', '4', '5', '[object Object]', '', '8' ]
```

缺陷：

+ 所有类型的元素都会变成字符串
+ `null`、`undefined`会变成空字符串、对象会变成`[object Object]`
