<template>
  <div id="sign-up">
    <el-form :model="signUpForm" :rules="rules" ref="signUpForm" label-width="0" label-position="left">
      <el-form-item prop="phone">
        <el-input
          clearable
          v-model="signUpForm.phone"
          placeholder="用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          clearable
          type="password"
          v-model="signUpForm.pwd"
          placeholder="密码">
        </el-input>
      </el-form-item>
    </el-form>
<!--    <span class="is-agree">点击注册即表示您同意<span class="protocol" @click="toggleShowProtocol">《使用条款》</span></span>-->
    <el-button class="submit-button" type="primary" :style="{ width: '100%' }" @click="submitForm">注册</el-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
import Bus from '@/utils/event-bus.js'
export default {
  data () {
    return {
      signUpForm: {
        phone: '',
        pwd: '',
        verificationCode: ''
      },
      verificationCodeDisabled: true,
      getVerificationCodeDisabled: true,
      countDown: 60,
      buttonStatus: 0,
      signUpButtonDisabled: true,
      interval: null,
      rules: {
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    // validate form
    submitForm () {
      this.$refs['signUpForm'].validate((valid) => {
        if (valid) {
          this.signUp()
        } else {
          return false
        }
      })
    },
    // sign up, $api
    signUp () {
      let { phone, pwd } = this.signUpForm
      this.$api.userRegister({ name: phone, pwd: md5(pwd) }).then(res => {
        this.$msgMnger.success('注册成功')
        Bus.$emit('signUp', 'left')
      }).catch(err => {
        this.$msgMnger.httpError(err)
      })
    },
    // 获取验证码
    getVerificationCode () {
      this.verificationCodeDisabled = false
      this.getVerificationCodeDisabled = true
      this.signUpButtonDisabled = false
      this.interval = setInterval(() => {
        this.countDown--
        if (this.countDown === 0) {
          this.countDown = 60
          clearInterval(this.interval)
          this.interval = null
          this.getVerificationCodeDisabled = false
        }
      }, 1000)
      // 调用接口
      this.$api.getUserBindCode(this.signUpForm.phone).then(res => {
        this.$msgMnger.success('验证码发送成功, 请注意查收!')
      }).catch(err => {
        this.$msgMnger.error(err.msg)
      })
    },
    // check phone number
    checkUserPhone () {
      return this.$api.checkUserName(this.signUpForm.phone)
    },
    toggleShowProtocol () {
      Bus.$emit('show-protocol', true)
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-up {
  .is-agree {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.45);
    line-height: 20px;
    .protocol {
      color: #981E32;
      cursor: pointer;
    }
  }
  .get-verification-code-button {
    background-color: #3C4145;
    outline: none;
    border: none;
  }
  .submit-button {
    margin-top: 20px;
    background-color: #3C4145;
    outline: none;
    border: none;
  }
}
</style>
