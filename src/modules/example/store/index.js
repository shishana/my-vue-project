
import example from './example'
import loading from '../../../store/loading'

function mount () {
  this.$store.registerModule('example', example)
  this.$store.registerModule('loading', loading)
}

export default {
  mount
}