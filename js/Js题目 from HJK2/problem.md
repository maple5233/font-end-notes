# 深大官微 - 技术部 - 2016招新-JavaScript笔试题

> 充满套路的一份试卷

## 1. 填空题
1. `Array.prototype.splice` 函数会改变原数组（正确或错误）

   正确。

2. 下面代码可以输出 0 ~ 9（正确或错误）
   ```javascript
    for (var i = 0; i < 10; i++) {
      console.log(i)
    }
   ```
   正确。怎么看都没什么错误的。

3. 定义一个函数必须要有名称（正确或错误）

   错误。

   ```js
   let a = function foo (){}
   //　右边就是一个匿名函数
   ```

4. `Array.prototype.map` 第一个参数是一个函数（正确或错误）

   正确

5. 通过一个函数创建对象需要用____________关键字

   new

6. `String`、`Array` 的原型都指向____________的原型

   一个空函数

## 2. 填写下面表达式的计算结果

1. `var a = 1`　=>  `undefined`

2. `undefined == null`  =>  `true`

3. `NaN === NaN`  =>  `false`

4. `{ value: 1 } === { value: 1 }`  =>  `false`

5. `[298, 30, 310, 32].sort()`  =>  `[298,30,310,32]`

   排序方法返回新数组　不改变原来的数组

6. `0.8 - 0.6 == 0.2`  =>  `false`

   浮点数是不精确的

7. `Array.isArray(Array.prototype)`   =>  `true`

   数组的显式原型当然是数组

8. `1 < 2 < 3 && 3 < 2 < 1`  =>  `true`

   `1 < 2 => true=>1  1<3 => true` 后者同理

9. `1 / 0`  =>  `Infinity`

   无穷大

10. `('5' + 3) + ('5' - 3)`  =>  `'532'`

   '5' + 3 =  '53' 

   '5' - 3 = 2

   '53' + 2 = '532'

## 3. 填写下面代码段的输出结果

1. `foo` 函数的执行结果为：

   ```JavaScript
    function foo () {
      var x = 1

      function bar () {
        var y = 'A'
        console.log(y)
      }

      console.log(x)
    }
   // 1
   // 并没有调用bar()　所以没啥卵用
   ```

2. 下面代码的执行结果为：
   ```JavaScript
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(arr.reduce(function (a, b) { return a + b }))
    // 55
    // 简单的遍历累加求和函数
   ```

3. 下面代码的执行结果为：
   ```JavaScript
    function getAge () {
      var y = new Date().getFullYear()
      return y - this.birth
    }

    var sixgod = {
      name: '66',
      birth: 1996,
      age: getAge
    }

    var f = sixgod.age
    console.log(f())
    // NaN
    // getAge里的this指向window　自然this.birth === undefined
    // y - this.brith 得到 NaN
   ```

4. 下面代码的执行结果为：
   ```javascript
    var name = 'World!';
    (function () {
      if (typeof name === 'undefined') {
        var name = 'Jack'
        console.log('Goodbye ' + name)
      } else {
        console.log('Hello ' + name)
      }
    })()
    // Good byte Jack
    // 外面的name在闭包里是undefined
   ```

5. 下面代码的执行结果为：
   ```javascript
    function showCase (value) {
      if (value === 'A') console.log('Case A')
      else if (value === 'B') console.log('Case B')
      else if (value == null) console.log('Nothing')
      else console.log('Do not know!')
    }

    showCase(new String('A'))
    // Do not know!'
    // new String("A")是String对象 
   ```

6. 下面代码的执行结果为：
   ```javascript
    var val = 'smtg'
    console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing')
    // Something
    // ('Value is ' + (val === 'smtg'))　是非空字符串 转化为逻辑值true
   ```

7. `x` 的值和输出的内容分别为：
   ```javascript
    var x
    if (x = '' == 0 === false) console.log(233)
    else console.log(666)
    // 666
    // x = '' => false
    // false == 0 => true
    // true === false => false
   ```

8. `result` 的值为：
   ```javascript
    var result = [
      ['keyword', ''],
      ['category', 'all'],
      ['start', '2016-10-28'],
      ['end', '']
    ].filter(function (item) { return item[1] })
    .concat([['page', this.page]])
    .map(function (item) { return item[0] + '=' + item[1] })
    .join('&')
    // "category=all&start=2016-10-28&page=undefined"
    // 不需要过多解释吧
   ```

## 4. 程序设计题

1.  DNA匹配

    + 题目描述

        设计一个函数，参数是一个DNA双链的其中一条链（`String` 类型，如`'ATCGGTACGA'`），要求返回其匹配的DNA单链（`String`）

    + 样例输入

      ```javascript
        'ATTCCGATG'
      ```

    + 样例输出

      ```javascript
        'TAAGGCTAC'
      ```

    答案：

    ```js
    let getDNA = (str) => {
      return str.split('').reduce((str,item) => {
        switch (item){
          case 'A': return str + 'T'
          case 'T': return str + 'A'
          case 'C': return str + 'G'
          case 'G': return str + 'C'
          }
      },'')
    }
    ```

2.  字符串拓展

    + 题目描述

        设计一个函数，参数是一个字符串，按照下面的格式返回字符串

    + 样例输入

      ```javascript
        'sixgod'
        'iszu'
      ```

    + 样例输出
      ```javascript
        'S-Ii-Xxx-Gggg-Ooooo-Dddddd'
        'I-Ss-Zzz-Uuuu'
      ```

    + 答案：

      ```js

      ```

      ​


## 5. 前端

1. 下面代码有什么效果？

   ```javascript
    var items = document.getElementsByClassName('item')
    items.forEach(function (el) { el.style.color = 'red' })
   ```

2. 下面代码是要实现点击 `#bar` 后，`#foo` 中的文本变成“baz”，但有一些错误，请修改：
   ```html
    <html>
      <head>
        <script src="test.js"></script>
      </head>
      <body>
        <p id="foo"></p>
        <button id="bar">Click!</button>
      </body>
    </html>
   ```

   ```javascript
    // test.js
    function barClickHandler () {
      document.getElementById('foo').innerText = 'bar'
    }

    document.getElementById('bar').addEventListener('click', barClickHandler())
   ```

3. 假设已有ID为 `el` 的一个 `div`，请写出向 `el` 内部的末尾添加一个指向 `www.baidu.com` 的超链接

4. 同上题，现在要在 `el` 的后面（与 `el` 同级）增加这个链接，请写出相应代码：

5. 请写出使用原生 `XMLHttpRequest` 方法 `GET` `https://iszu.cn/board/api/article/333333` （某个具体函数名忘了写近似的就行）

## 5. 后端

1. 请写出使用 `npm` 安装 `koa` 2.0，并写入依赖的命令行

2. 下面代码的运行结果为：

   ```javascript
    module.exports.foo = '123'
    module.exports = '233'
    console.log(exports.foo)
   ```

3. 先执行 `foo.js`，则下面代码的运行结果为：

   ```javascript
    // foo.js
    var bar = require('./bar')
    module.exports = bar.baz('123')
   ```

   ```javascript
    // bar.js
    module.exports = {
      baz: function (s) {
        setTimeout(function () {
          var foo = require('./foo')
          console.log(foo)
        }, 1000)

        return s + '456'
      }
    }
   ```

4. 假设 `foo` 文件中的内容为 `foo`，`bar` 文件中的内容为 `bar`，`baz` 文件中的内容为 `baz`，下面代码的运行结果为：

   ```javascript
    var fs = require('fs')
    var foo
    var bar = fs.readFileSync('bar')
    var baz = fs.readFile('baz')

    fs.readFile('foo', function (err, data) {
      foo = data
    })

    console.log(foo, bar, baz)
   ```

5. 请使用 `http` 模块创建一个在 `80` 端口的服务器，不管请求什么都返回 `Hello World!`