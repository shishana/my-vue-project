/**
 * events.js
 * @file msg manager
 * @author bayesba
 */

import { warningMsg } from './code2msg.js'
// import { code2msg, warningMsg } from './code2msg.js'

function bindContext (context) {
  this.context = context
}

function error (data) {
  this.context.$message({ type: 'error', message: data })
}

function warn (data) {
  this.context.$message({ type: 'warning', message: data })
}

function success (data) {
  this.context.$message({ type: 'success', message: data })
}

function info (data) {
  this.context.$message({ type: 'info', message: data })
}

function httpError (data) {
  if (data.hasOwnProperty('response')) {
    if (data.response.status === 403) {
      return
    }
  }
  if (data.hasOwnProperty('code')) {
    if (data.code !== 0) {
      let _msg = data.code > 0 ? data.msg : data.msg // code2msg(data)
      this.context.$message({ type: 'error', message: _msg })
    }
  } else {
    this.context.$message({ type: 'error', message: data.message })
  }
}

function httpWarning (data) {
  this.context.$message({ type: 'warning', message: warningMsg(data) })
}

export default {
  bindContext,
  error,
  warn,
  success,
  info,
  httpError,
  httpWarning
}
