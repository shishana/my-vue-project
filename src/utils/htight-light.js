import Vue from 'vue'

function hightLight (el, binding) {
  const match = binding.value
  const reg = new RegExp(match, 'g')
  const txt = binding.arg
  let str = ''
  if (txt) {
    str = txt.replace(reg, `<span style="color:red">${match}</span>`)
  } else {
    str = ''
  }
  el.innerHTML = str
}

Vue.directive('hightlight', {
  bind (el, binding) {
    hightLight(el, binding)
  },
  componentUpdated (el, binding) {
    hightLight(el, binding)
  }
})
