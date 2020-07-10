<template>
  <div id="pwd-retrieve">
    <div class="retrieve-title">找回密码</div>
    <el-form :model="retrieveForm" :rules="rules" ref="retrieveForm" label-width="0" label-position="left">
      <el-form-item prop="phone">
        <el-input
          clearable
          v-model="retrieveForm.phone"
          placeholder="手机号">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          clearable
          type="password"
          v-model="retrieveForm.pwd"
          placeholder="新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="verificationCode">
        <el-row>
          <el-col :span="15">
            <el-input
              clearable
              :disabled="verificationCodeDisabled"
              v-model="retrieveForm.verificationCode"
              @keyup.enter.native="submitForm()"
              placeholder="验证码">
            </el-input>
          </el-col>
          <el-col :span="7" :offset="2">
            <el-button
              :disabled="getVerificationCodeDisabled === 1 ? true : getVerificationCodeDisabled"
              type="primary"
              style="width: 100%;"
              class="get-verification-code-button"
              :title="getVerificationCodeDisabled ? '请输入正确的手机号以获取验证码' : ''"
              @click="getVerificationCode"
            >
              {{ verificationCodeDisabled ? '获取验证码' : (getVerificationCodeDisabled ? `${countDown}秒后重试` : '获取验证码') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span class="back-to-sign-in" @click="backToSignIn">返回登录</span>
    <el-button :disabled="signUpButtonDisabled" class="submit-button" type="primary" :style="{ width: '100%' }" @click="submitForm">确认找回</el-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
import Bus from '@/utils/event-bus.js'
export default {
  name: 'pwd-retrieve',
  data () {
    let phoneValidator = (rule, phone) => {
      const re = /^0?(13|14|15|17|18|19)[0-9]{9}$/
      // const _this = this
      // 调用接口异步验证
      return new Promise((resolve, reject) => {
        if (re.test(phone)) {
          resolve()
          this.getVerificationCodeDisabled = this.interval ? 1 : false
        } else {
          reject(new Error('手机号格式有误, 请重试'))
          this.getVerificationCodeDisabled = true
        }
      })
    }
    return {
      retrieveForm: {
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
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneValidator, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { length: 6, message: '验证码为 6 位数字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    // validate form
    submitForm () {
      this.$refs['retrieveForm'].validate((valid) => {
        if (valid) {
          this.retrieve()
        } else {
          return false
        }
      })
    },
    // sign up, $api
    retrieve () {
      let { phone, pwd, verificationCode } = this.retrieveForm
      this.$api.pwdRetrieve({ name: phone, pwd: md5(pwd), captive: verificationCode }).then(res => {
        this.$msgMnger.success('找回成功, 请重新登录')
        Bus.$emit('toggle-pwd-retrieve', 'login')
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
      this.$api.getUserBindCode(this.retrieveForm.phone, 'retrieve').then(res => {
        this.$msgMnger.success('验证码发送成功, 请注意查收!')
      }).catch(err => {
        this.$msgMnger.error(err.msg)
      })
    },
    // check phone number
    checkUserPhone () {
      return this.$api.checkUserName(this.retrieveForm.phone)
    },
    backToSignIn () {
      Bus.$emit('toggle-pwd-retrieve', 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
#pwd-retrieve {
  .is-agree {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.45);
    line-height: 20px;
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
  .retrieve-title {
    padding: 15px 0;
    font-size: 14px;
  }
  .back-to-sign-in {
    color: #981E32;
    cursor: pointer;
  }
}
</style>
