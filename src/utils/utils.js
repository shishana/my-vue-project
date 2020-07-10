// 节流函数
export const throttle = function (fn, gapTime = 2000) {
  let _lastTime = null
  return function () {
    let _nowTime = +new Date() // 当前时间戳
    if (!_lastTime || _nowTime - _lastTime > gapTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}
// 防抖函数
export const debounce = function (fn, gapTime = 1000) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, gapTime)
  }
}
