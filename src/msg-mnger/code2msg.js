
/**
 * code2msg.js
 * msg content config
 * @author bayesba
 */

export const obj = {
}

export function code2msg (error) {
  
  if (!Object.prototype.hasOwnProperty.call(obj, `${error.code}`)) {
    return `错误码：${error.code}`
  }

  return obj[String(error.code)]
}

// eslint-disable-next-line no-unused-vars
export function warningMsg (warning) {
  return ''
}
