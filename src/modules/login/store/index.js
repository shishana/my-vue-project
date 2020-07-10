
import user from './user'
import userInfo from './user-info'

function mount () {
  this.$store.registerModule('user', user)
  this.$store.registerModule('userInfo', userInfo)
}

export default {
  mount
}
