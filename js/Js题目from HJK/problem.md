# 1. 计算两个日期的天数差

## 函数模板
```javascript
function daySpan (date1, date2) {
  // your code
}
```

## 函数参数
* `date1: Date` 第一个日期
* `date2: Date` 第二个日期

## 调用样例
```javascript
daySpan(new Date(2016, 5, 7), new Date(2016, 3, 2))     // 66
daySpan(new Date(2016, 3, 2), new Date(2016, 5, 7))     // 66
```

# 2. 计算两个日期的天数差 - 高级版

## 函数模板
```javascript
function daySpan (date1, date2) {
  // your code
}
```

## 函数参数
* `date1: String` 第一个日期
* `date2: String` 第二个日期

这两个日期字符串都会按照`YYYY-MM-DD`的格式输入，如`2016-10-09`

## 调用样例
```javascript
daySpan('2016-05-07', '2016-03-02')     // 66
daySpan('2016-03-02', '2016-05-07')     // 66
```

# 3. 计算数组中元素重复次数

## 函数模板
```javascript
function countRepeat (arr) {
  // your code
}
```

## 函数参数
* `arr: Array<Number>` 仅包含数字的数组

## 调用样例
```javascript
countRepeat([2, 9, 8, 4, 5, 3, 4, 8, 9, 9, 1, 0, 2, 1])
/* 顺序不影响结果
{
  '0': 1,
  '1': 2,
  '2': 2,
  '3': 1,
  '4': 2,
  '5': 1,
  '8': 2,
  '9': 3
} */
```

# 4. 驼峰转换函数

在代码的世界里，标识符中不能有空格，
但有时一个变量必须由两个或更多个单词来表达，如`count repeat`、`get own poperty descriptor`等。
这时候就必须把他们写成**第一个单词全小写，第二个以及后面的单词，除了首字母全小写**的形式（即**驼峰**），
如`countRepeat`、`getOwnPropertyDescriptor`

下面你需要编写一个函数来实现这个功能

## 函数模板
```javascript
function camelCase (str) {
  // your code
}
```

## 函数参数
* `str: String` 要转换的字符串，可能的形式看下面的例子

## 调用样例
```javascript
camelCase('hey guys')           // 'heyGuys'
camelCase('HELLO-world')        // 'helloWorld'
camelCase('oh  mY---gOd')       // 'ohMyGod'
```

# 5. 寻找字符串中第一个未重复的字符

寻找字符串中第一个未重复的字符，如果没有找到，则返回一个空字符串（`''`）

## 函数模板
```javascript
function firstNonRepeat (str) {
  // your code
}
```

## 函数参数
* `str: String` 要寻找的字符串，可能是任何内容

## 调用样例
```javascript
firstNonRepeat('aaabccc')     // 'b'
firstNonRepeat('6666666')     // ''
```

# 6. 展平数组

数组中可以嵌套数组，要嵌套多少层都可以，比如`[1, 2, [[3], 4]]`。
这样看起来很不爽，所以我们要把它展开，只留下一层数组: `[1, 2, 3, 4]`

提示：判断`xxx`是否是数组的方法为 `Array.isArray(xxx)`

## 函数模板
```javascript
function flatten (arr) {
  // your code
}
```

## 函数参数
* `arr: Array` 包含嵌套数组的数组

## 调用样例
```javascript
flatten([1, 2, 3])                // [1, 2, 3]
flatten([1, 2, [3]])              // [1, 2, 3]
flatten([1, 2, [[3], 4]])         // [1, 2, 3, 4]
flatten([1, [2, [[3], [4]]]])     // [1, 2, 3, 4]
```