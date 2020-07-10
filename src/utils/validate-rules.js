/*
 * @Description: validate rules
 * @Author: bayesba
 * @Date: 2019-02-12 18:39:56
 * @LastEditTime: 2019-02-13 15:57:03
 * @LastEditors: Please set LastEditors
 */

function requiredRule (msg = '请输入内容') {
  return  { required: true, message: msg, trigger: 'blur' }
}

function lengthRule (msg = '长度错误', len = 4) {
  return { len: len, message: msg, trigger: 'blur' }
}

function rangeRule (min = 3, max = 16, msg = `请输入长度在 ${min} 到 ${max} 个字符`) {
  return { min: 3, max: 16, message: msg, trigger: 'blur' }
}

function regExpRule (regExp, msg = '格式错误') {
  return { pattern: regExp, message: msg, trigger: 'change' }
}

function customRule (validator, msg = '输入内容错误') {
  return { validator: validator, message: msg, trigger: 'change' }
}

export default {
  requiredRule,
  lengthRule,
  rangeRule,
  regExpRule,
  customRule
}
