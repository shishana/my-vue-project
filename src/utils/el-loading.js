/*
 * @Description: laoding control
 * @Author: bayesba
 * @Date: 2019-02-13 10:32:04
 * @LastEditTime: 2019-05-06 13:58:04
 * @LastEditors: Please set LastEditors
 */

import { Loading } from 'element-ui'
import Vue from 'vue'

let loading = null
let start = 0
let loadingDuration = 1000
let loadingDelay = 0
let isCloseCalled = true

/**
 * @description: start loading
 * @param {object} options
 * @param {int} timeout
 * @param {int} delay
 * @return:
 */
function service (options = {}, timeout = 500000) {
  isCloseCalled = false
  let date = new Date()
  start = date.getTime()

  setTimeout(() => {
    if (isCloseCalled) {
      return
    }
    loading = Loading.service(options)
    setTimeout(() => {
      loading.close()
    }, timeout)
  }, loadingDelay)
}

/**
 * @description: close loading
 * @param {type}
 * @return:
 */
function close () {
  isCloseCalled = true
  let date = new Date()
  let duration = date.getTime() - start
  let delay = 0

  if (duration < loadingDuration) {
    delay = loadingDuration - duration
  }
  setTimeout(() => {
    loading && loading.close()
  }, delay)
}

/**
 * @description: register custom vue directive v-load
 */
Vue.directive('load', {
  // bind (el, binding) {
  //   console.log(binding.value)
  //   console.log(typeof (binding.value.options))
  // },
  update: function (el, binding) {
    if (binding.value.loading) {
      service(binding.value.options)
    } else {
      close()
    }
  }
})
