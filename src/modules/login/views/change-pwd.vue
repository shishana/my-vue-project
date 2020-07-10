<template>
  <div id="change-pwd">
    <div class="change-pwd-title">修改密码</div>
    <el-form :model="pwdForm" :rules="rules" ref="pwdForm" label-width="80px" label-position="right">
      <el-form-item prop="oldPwd" label="旧密码">
        <el-input
          clearable
          type="password"
          v-model="pwdForm.oldPwd"
          prefix-icon="el-icon-lock"
          placeholder="旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd" label="新密码">
        <el-input
          clearable
          type="password"
          v-model="pwdForm.pwd"
          prefix-icon="el-icon-lock"
          placeholder="新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwdConfirm" label="确认密码">
        <el-input
          clearable
          type="password"
          v-model="pwdForm.pwdConfirm"
          prefix-icon="el-icon-lock"
          placeholder="确认密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  components: {
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value !== this.pwdForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        oldPwd: '',
        pwd: '',
        pwdConfirm: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        pwdConfirm: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {},
  methods: {
    submitForm () {
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          let { oldPwd, pwd } = this.pwdForm
          this.$api.resetPwd({ old_pwd: md5(oldPwd), pwd: md5(pwd) }).then(data => {
            this.$router.replace('/')
          }).catch(e => {
            console.error(e)
            this.$msgMnger.error(e.msg)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#change-pwd{
  width: 500px;
  padding: 100px 0 0 0;
  margin: 0 auto;
  text-align: center;
  .change-pwd-title{
    font-size: 16px;
    padding: 0 0 20px 0;
  }
}
</style>
