# CSRF攻击
## CSRF攻击是什么
`CSRF`是跨站请求伪造的缩写，也被称为`XSRF`， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。  
跟跨网站脚本（XSS）相比，XSS利用的是用户对指定网站的信任，CSRF利用的是网站对用户网页浏览器的信任。  
**因为CSRF攻击利用的是冲着浏览器分不清发起请求是不是真正的用户本人。**，也就是说，简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

## CSRF攻击基本原理
### 最简单的CSRF攻击
1. 用户Alice登录和访问某银行网站A，保留`cookie`。
2. Alice被某些信息诱导访问危险网站B。
3. 危险网站B上有一个`<img>`标签：`<img src="http://www.examplebank.com/account=Alice&amount=1000&payfor=Badman" >`
4. 这个标签的src不指向一张图片，而是一个http请求，这个请求向银行要求将Alice的1000元转给Badman，由于Alice的浏览器上有`cookie`，这样浏览器发出的这个请求就能得到响应执行。
5. 这样Alice的钱就被偷了。

### 进阶攻击
危险网站可以伪造一个表单并隐藏，并在自己网站的`onload`事件中，触发这个表单的提交事件，就可以改GET攻击为POST攻击

## CSRF攻击的对象与防范思路
我们要防范它，先要知道它的目标，然后设法保护这些目标。
我们要明白，仅仅靠发起CSRF攻击的话，黑客只能借助受害者的`cookie`骗取服务器的信任，但是黑客并不能凭借拿到`cookie`，也看不到 `cookie`的内容。另外，对于服务器返回的结果，由于浏览器同源策略的限制，黑客也无法进行解析。  
这就告诉我们，我们要保护的对象是那些可以直接产生数据改变的服务，而对于读取数据的服务，则不需要进行`CSRF`的保护。  
而保护的关键，是**在请求中放入黑客所不能伪造的信息**。

## 防范手段
### 最基本的手段：涉及敏感操作的请求改为POST请求
这个方法的确可以防范一些`CSRF`攻击，但是对于进阶攻击就无能为力了——`POST`请求一样可以伪造。  
所以这个方法不够安全。只能提高攻击的门槛。  
### 一般手段
#### 用户操作限制——验证码机制
方法：添加验证码来识别是不是用户主动去发起这个请求，由于一定强度的验证码机器无法识别，因此危险网站不能伪造一个完整的请求。
优点：简单粗暴，低成本，可靠，能防范99.99%的攻击者。
缺点：对用户不友好。
#### 请求来源限制——验证 HTTP Referer 字段
方法：在`HTTP`请求头中有一个字段叫`Referer`，它记录了请求的来源地址。  服务器需要做的是验证这个来源地址是否合法，如果是来自一些不受信任的网站，则拒绝响应。
优点：零成本，简单易实现。
缺点：由于这个方法严重依赖浏览器自身，因此安全性全看浏览器。  

1. 兼容性不好：每个浏览器对于`Referer`的具体实现可能有差别。
2. 并不一定可靠：在一些古老的垃圾浏览器中，`Referer`可以被篡改。
3. 对用户不友好：`Referer`值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权。因此有些用户可能会开启浏览器防止跟踪功能，不提供`Referer`，从而导致正常用户请求被拒绝。

#### 额外验证机制——token的使用
方法：使用`token`来代替验证码验证。由于黑客并不能拿到和看到`cookie`里的内容，所以无法伪造一个完整的请求。基本思路如下：  

1. 服务器随机产生`token`（比如把`cookie` hash化生成），存在`session`中，放在`cookie`中或者以`ajax`的形式交给前端。
2. 前端发请求的时候，解析`cookie`中的`token`，放到请求`url`里或者请求头中。
3. 服务器验证`token`，由于黑客无法得到或者伪造`token`，所以能防范`csrf`

更进一步的加强手段（不需要session）：

1. 服务器随机产生`token`，然后以`token`为密钥散列生成一段密文
2. 把`token`和密文都随`cookie`交给前端
3. 前端发起请求时把密文和`token`都交给后端
4. 后端对`token`和密文进行正向散列验证，看`token`能不能生成同样的密文
5. 这样即使黑客拿到了`token` 也无法拿到密文。

优点：  

1. 安全性：极大地提高了破解成本（当然还是有办法破解），但是99%的攻击者看到散列的时候就已经望而生畏了。
2. 易用性：非常容易实现。
3. 友好性：对用户来说十分友好。

缺点：

1. 性能担忧：需要`hash`计算，增加性能上的成本
2. `cookie`臃肿：更加依赖网络的情况
3. 并不绝对安全：
	1. 一些论坛之类支持用户自己发表内容，由于系统也会在这个地址后面加上`token`，这样黑客可以在自己的网站上得到这个 `token`，并马上就可以发动CSRF攻击。（进一步加强法可以防范，或者验证链接是否是链到自己本站的，是就在后面添加 `token`，如果是通向外网则不加）
	2. 其他攻击方式如XSS攻击能拿到`cookie`和`token`，当然这不在本文的讨论范围之内。
4. 对于POST请求，难以将`token`附在请求中。（可以通过框架和库解决）

#### 曲线救国——在HTTP头中自定义属性并验证
方法：这种方法也是使用token并进行验证，和上一种方法不同的是把它放到HTTP头中自定义的属性里。  

优点：  

1. 这样解决了上种方法在请求中加入 token 的不便
2. 通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，安全性较高

缺点：

1. 局限性非常大：XMLHttpRequest请求通常用于Ajax，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，造成不便。
2. 对于旧网站，要把所有请求都改为XMLHttpRequest请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

### 总结
**因为CSRF攻击利用的是冲着浏览器分不清发起请求是不是真正的用户本人，所以防范的关键在于在请求中放入黑客所不能伪造的信息。从而防止黑客伪造一个完整的请求欺骗服务器。**
