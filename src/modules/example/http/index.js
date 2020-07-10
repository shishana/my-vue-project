import * as example from './example'

function mount () {
  this.$api['getList'] = example.getList
}

export default {
  mount
}