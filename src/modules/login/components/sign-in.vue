<template>
  <div id="sign-in">
    <el-form :model="signInForm" :rules="rules" ref="signInForm" label-width="0" label-position="left">
      <el-form-item prop="phone">
        <el-input
          clearable
          v-model="signInForm.phone"
          prefix-icon="el-icon-mobile-phone"
          placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          clearable
          type="password"
          v-model="signInForm.pwd"
          @keyup.enter.native="submitForm()"
          prefix-icon="el-icon-lock"
          placeholder="密码">
        </el-input>
      </el-form-item>
    </el-form>
    <span class="forget-pwd" @click="handleForgetPwd">忘记密码</span>
    <el-button class="submit-button" type="primary" :style="{ width: '100%' }" @click="submitForm">登录</el-button>
  </div>
</template>

<script>
// import validate from '../../../utils/validate'
import md5 from 'js-md5'
import Bus from '../../../utils/event-bus'
export default {
  data () {
    // validate email
    // let validatePhone = (rule, value, callback) => {
    //   if (!validate.validatePhone(value)) {
    //     callback(new Error('账号有误, 请重试'))
    //   }
    //   callback()
    // }
    return {
      // TODO: 删掉默认
      signInForm: {
        phone: '',
        pwd: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validatePhone, trigger: 'blur' }
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
      this.$refs['signInForm'].validate((valid) => {
        if (valid) {
          this.signIn()
        } else {
          return false
        }
      })
    },
    // login, $api
    signIn () {
      let { phone, pwd } = this.signInForm
      this.$api.userLogin({ name: phone, pwd: md5(pwd) }).then(res => {
        // let _userInfo = JSON.parse(JSON.stringify(res.data))
        // TODO: 修改字段名称
        // _userInfo['username'] = phone
        this.$store.dispatch('AUTH_TOKEN', res.data.token)
        // this.$store.commit('SET_USER_INFO', _userInfo)
        // localStorage.setItem('user-info', JSON.stringify(_userInfo))
        this.$store.dispatch('GET_USER_INFO', this)
        this.$msgMnger.success('登录成功')
        let nextPath = this.$route.query.next || '/'
        this.$router.push(nextPath)
      }).catch(err => {
        this.$msgMnger.httpError(err)
      })
      // this.$store.dispatch('AUTH_TOKEN', 'test_token_aaaaaaaaaaaaaaa')
      // this.$router.replace('/')
    },
    // forget password
    handleForgetPwd () {
      Bus.$emit('toggle-pwd-retrieve', 'pwd-retrieve')
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
  .forget-pwd {
    color: #981E32;
    cursor: pointer;
  }
  .submit-button {
    margin-top: 20px;
    background-color: #3C4145;
    outline: none;
    border: none;
  }
}
</style>
