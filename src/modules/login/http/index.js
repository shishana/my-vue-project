
import * as login from './login'

function mount () {
  // 流程文件列表
  this.$api['bcLogin'] = login.bcLogin
  this.$api['getUserInfo'] = login.getUserInfo
  this.$api['checkUserName'] = login.checkUserName
  this.$api['getUserBindCode'] = login.getUserBindCode
  this.$api['userRegister'] = login.userRegister
  this.$api['userLogin'] = login.userLogin
  this.$api['pwdRetrieve'] = login.pwdRetrieve
  this.$api['resetPwd'] = login.resetPwd
}

export default {
  mount
}
