function convert10to26 (num) {
  let str = ''
  while (num > 0) {
    let m = num % 26
    if (m === 0) {
      m = 26
    }
    str = String.fromCharCode(m + 64) + str
    num = (num - m) / 26
  }
  return str
}

function convert26to10 (str) {
  let n = 0
  let s = str.match(/./g)
  // let j = 0
  for (let i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
    let c = s[i].toUpperCase()
    if (c < 'A' || c > 'Z') {
      return 0
    }
    n += (c.charCodeAt(0) - 64) * j
  }
  return n
}

export default {
  convert10to26,
  convert26to10
}
