<template>
  <div id="login" v-load="{loading: loading, options: {text: '拼命加载中', spinner: 'el-icon-loading', background: 'rgba(255, 255, 255, 0.4)'}}">
    <b-layout class="noti" placement="bottom" space="120px" :border="false">
      <div slot="first" class="icon">
        <span></span>
      </div>
      <div slot="last" class="info">
        <div class="des">{{getDes()}}</div>
        <el-button class="btn" size="mini" type="primary" @click="clickEvent()">授权登录</el-button>
      </div>
    </b-layout>
  </div>
</template>

<script>
import BLayout from '@/layouts/BinaryLayout.vue'
export default {
  components: {
    BLayout
  },
  data () {
    return {
      loading: false,
      alertConfig: [
        { title: '登录失败了！', type: 'error', des: '请点击登录获取授权...' },
        { title: '您取消了登录！', type: 'warning', des: '请点击登录获取授权...' }
      ],
      state: 1
    }
  },
  mounted () {
  },
  methods: {
    getTitle () {
      return this.alertConfig[this.state].title
    },
    getType () {
      return this.alertConfig[this.state].type
    },
    getDes () {
      return this.alertConfig[this.state].des
    },
    clickEvent () {
      window.location.href = this.$api.oauthPath()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/index.scss';
#login{
  height: 100%;
  // background-color: $primary-bg-color-opacity;
  overflow: hidden;
  box-sizing: border-box;
  text-align: center;
  .noti{
    width: 420px;
    height: 460px;
    margin: 0 auto;
    margin-top: 10%;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 2px $tertiary-bg-color !important;
    // background-color: $primary-bg-color-opacity;
    .icon{
      height: 100%;
      background: url(../assets/login-failed.png) center no-repeat;
      background-size: 60%;
    }
    .info{
      .des{
        padding: 10px 20px;
        font-size: 12px;
        color: $default-text-color;
        font-size: 20px;
      }
      .btn{
        margin-top: 10px;
      }
    }
  }
}
</style>
