// 判断空对象
let isEmptyObject = (obj) => {
    if (typeof obj === "object" && !(obj instanceof Array) && (obj !== null)) {  
        for (let prop in obj) {  
            return false
        }
        return true
    }
    return false
}


// 使用Array.from去重
let unique1 = (arr) => (Array.from(new Set(arr)))
// 使用展开运算符去重
let unique2 = (arr) => ([...(new Set(arr))])

/**
 * 实现reduce
 * @param  {Array} arr              调用的数组
 * @param  {Function} func         回调函数(previousValue上一次调用回调返回的值，或者是提供的初始值,
 * currentValue 数组中当前被处理的元素)
 * @param  {mixed} initialValue    作为第一次调用callback的第一个参数
 * @return {mixed}                  调用结果
 */
 let reduce = (arr, func, ...args) => {
    if(arr.length === 0 && args.length === 0) { // 数组是空并且没有指定initialValue的情况 抛出异常
        throw new TypeError()
    } else {
        let result = args.length === 0 ? arr[0] : args[0]
        let start = args.length === 0 ? 1 : 0
        for (let i = start; i < arr.length; i++) {
            result = func(result,arr[i],arr,i)
        }
        return result
    }
}
var total = reduce([1,2,3], function (previousValue, currentValue) {
  return previousValue + currentValue
},2)
console.log(total)