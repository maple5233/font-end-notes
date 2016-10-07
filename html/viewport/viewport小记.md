## viewport小记

### 关于像素
1. 设备物理宽度单位是dp 比如IPhone5是1136dpx640dp
2. css像素大小可变，一维上 1px=dpr*1dp
3. ppi=设备物理像素/设备长度 比如设备是a英寸，b dp*c dp的 那么斜线上是x=根号下(b2+c2) dp dpr就是x/a ppi
4. iphone5 1136x640像素 ppi为326约为320 那么dpr=2 实际设备的css像素（device-height和device-width）就是568*320 二维上一个css像素含有4个物理像素

### 关于viewport
1. 默认情况下页面渲染到移动端，有两步
	1. 第一步把页面渲染到一个排版viewport上，这个viewport的body有默认长度，不同设备不一样 iphone5是980px。
	2. 第二步默认把viewport缩放到内容能被全部看见 而不是出现滚动条（排版viewport宽会比设备宽宽 本应出现滚动条）
	3. 拿iphone5来说 一个640px宽 1136px高的页面 会被渲染在980px（其实是有滚动条的） 再缩放到320px的屏幕里（按1136:320）（滚动条消失了）
	4. window.innerWidth是页面**显示在一屏幕里的可视部分的宽度** 。在手机上，如果不设置缩放比为1，innerWidth始终等于可视区域的css宽度。当内容宽小于980时是980(你可以看到一个980px的区域)。而现在内容宽度(1136px)溢出大于body宽度(980px)时，由于移动端第二步的缩放作用，内容会被缩放到可以全部看到，就会等于内容宽度(1136px)，你看到了一个1136px的区域。
	5. document.body.clientWidth这时候始终是980px，因此body只占屏幕的一部分。
	6. 也就是说，由于缩放的存在，window.innerWidth是内容和viewport宽(document.body.clientWidth)的最大值。缩放会保证window.innerWidth尽可能大。
	
2. 这时候如果我们设置了`<meta name="viewport" content="width=device-width">` viewport宽就会变成device-width=320px。这样虽然屏幕上还是显示了全部的内容，body却显得更小了，好处是，我们可以按body总宽度是320px来分配页面了。对应手机做的第一步。

3. 为了正常显示滚动条 我们需要设置`<meta name="viewport" content="initial-scale=1">`，这样window.innerWidth就不是内容宽了，会变成和body相同的1:1变成320px。也就是只能看到320px的宽，于是超出部分不可见，表现为出现滚动条。对应手机做的第二步。

4. 需要注意的是只设置`<meta name="viewport" content="initial-scale=1">`也会有`width=device-width`的效果，而不依旧是`width=980px`了。如果没有这个效果只设置`initial-scale=1`就和PC没差了。

5. 所以我们一般设置`<meta name="viewport" content="width=device-width initial-scale=1">` 让body宽=viewport宽，然后内容溢出时出现滚动条。方便开发。
6. 这样做实际是回到以前手机没有viewport的时代，一旦我们规定网页是1000+px \* 1000+px 就会出现一堆滚动条 但是我们做响应式只要用百分比就行了，@media查询也只管查`width`。
