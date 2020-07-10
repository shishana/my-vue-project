<template>
  <div id="login">
    <div class="login-title">
      <div class="login-title-logo">
        <img class="login-title-logo-svg" src="../assets/img/login/bayes-logo.svg" alt="bayes_logo">
      </div>
      <div class="login-title-text">
        <h2 class="title-text-cn">智能网格预报预测系统</h2>
        <!-- <h2 class="title-text-en">Robotic Data Process Automation</h2> -->
      </div>
    </div>
    <div class="login-container">
      <b-tabs
        height="45px"
        @tab-changed="handleTabChange"
        v-if="flag === 'login'"
      >
        <span slot="b-tabs-header-left">账户密码登录</span>
        <span slot="b-tabs-header-right">注册账户</span>
        <sign-in v-show="currentTab === 'left'" slot="b-tabs-body"></sign-in>
        <sign-up v-show="currentTab === 'right'" slot="b-tabs-body"></sign-up>
      </b-tabs>
      <pwd-retrieve v-else></pwd-retrieve>
    </div>
    <div class="login-copyright">
      copyright &copy; 2019 西安贝业思数据智能技术服务有限公司
    </div>
<!--    usage-protocol-->
    <!-- <el-dialog
      title="使用条款"
      :visible.sync="isProtocolVisible"
      width="40%"
      :before-close="handleProtocolDialogClose">
      <protocol></protocol>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isProtocolVisible = false">确&nbsp;&nbsp;&nbsp;定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import BinaryTabs from '../components/BinaryTabs'
import SignIn from '../components/sign-in'
import SignUp from '../components/sign-up'
import PwdRetrieve from '../components/pwd-retrieve'
import Bus from '../../../utils/event-bus'
// import Protocol from '../components/protocol'
export default {
  components: {
    'b-tabs': BinaryTabs,
    'sign-in': SignIn,
    'sign-up': SignUp,
    'pwd-retrieve': PwdRetrieve
    // 'protocol': Protocol
  },
  data () {
    return {
      currentTab: 'left',
      activeTabName: 'sign-in',
      flag: 'login',
      isProtocolVisible: false
    }
  },
  mounted () {
    Bus.$on('toggle-pwd-retrieve', this.handleTogglePwdRetrieve)
    Bus.$on('show-protocol', this.showProtocol)
  },
  beforeDestroy () {},
  methods: {
    handleTabChange (flag) {
      this.currentTab = flag
    },
    handleTogglePwdRetrieve (flag) {
      this.flag = flag
    },
    showProtocol (isShowProtocol) {
      this.isProtocolVisible = isShowProtocol
    },
    handleProtocolDialogClose () {
      this.isProtocolVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
* {
  padding: 0;
  margin: 0;
  font-weight: normal;
}
#login {
  // justify-content: space-between;
  width: 470px;
  margin: 0 auto;
  height: 100%;
  .login-title {
    min-height: 200px;
    height: 250px;
    width: 100%;
    .login-title-text, .login-title-logo{
      float: left;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .login-title-logo {
      margin-left: 10px;
      .login-title-logo-svg {
        height: 60px;
      }
    }
    .login-title-text {
      margin-left: -30px;
      text-align: center;
      line-height: 33px;
      vertical-align: middle;
      .title-text-cn {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: rgba(0,0,0,0.85);
        letter-spacing: 2.8px;
      }
      .title-text-en {
        font-family: SourceHanSerifCN-Bold;
        font-size: 18px;
        color: rgba(0,0,0,0.45);
        letter-spacing: 0;
      }
    }
  }
  .login-container {
    height: calc(100% - 400px);
    width: 100%;
  }
  .login-copyright {
    height: 150px;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.45);
    text-align: center;
    line-height: 150px;
  }
  .dialog-footer {
    @include flex-horizontal-around-center;
    .el-button {
      padding: 10px;
    }
  }
}
</style>

<style lang="scss">
#login{
  .el-form{
    .el-form-item__label{
      // color: #fff;
    }
  }
}
</style>
