<template>
  <div>
    <h1 class="findpwd-title">{{ $t('forgotPassword') }}</h1>
    <div class="user-content">
      <div class="find-pwd">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="email">
            <el-input type="text" maxlength="50" v-model="form.email" :placeholder="$t('email')">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" maxlength="16" v-model="form.password" :placeholder="$t('password')">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input type="password" maxlength="16" v-model="form.password1" :placeholder="$t('confirmPassword')">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="inputCaptchaCode">
            <el-input type="text" maxlength="100" v-model="form.inputCaptchaCode" :placeholder="$t('verificationCode')">
              <i slot="prefix" class="el-input__icon el-icon-chat-line-square"></i>
              <el-button
                style="border-radius: 0 19px 19px 0"
                slot="append"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && $t('send') ||(state.time+' s')">
                {{ $t('send') }}
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="user-submit-btn"
              type="primary"
              :loading="submitBtn"
              @click="onSubmit('form')">
              {{ $t('submit') }}
            </el-button>
          </el-form-item>
        </el-form>
        <div style="padding-bottom: 20px;">
          <router-link style="color: #059bda; margin-top: 10px;" :to="{ name: 'Login' }">
            Go to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postSendcaptcha, postResetpwd } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.form.checkPass !== '') {
        this.$refs.form.validateField('password1')
      }
      callback()
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error(this.$t('registerRules.passwordDiff')))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: '',
        password1: '',
        captchaCode: '',
        inputCaptchaCode: ''
      },
      rules: {
        email: [
          { required: true, message: this.$t('registerRules.username'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('registerRules.password'), trigger: 'change' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password1: [
          { required: true, message: this.$t('registerRules.password'), trigger: 'change' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        inputCaptchaCode: [
          { required: true, message: this.$t('registerRules.code'), trigger: 'change' }
        ]
      },
      // status
      state: {
        time: 60,
        smsSendBtn: false
      },
      submitBtn: false
    }
  },
  methods: {
    // 获取验证码
    getCaptcha (e) {
      e.preventDefault()
      this.$refs.form.validateField('email', err => {
        if (!err) {
            this.state.smsSendBtn = true
            const interval = window.setInterval(() => {
              if (this.state.time-- <= 0) {
                this.state.time = 60
                this.state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)
            postSendcaptcha({
              email: this.form.email
            }).then((res) => {
              if(res.code === 200) {
                this.form.captchaCode = res.data
                this.$message.success(this.$t('sendSuccess'))
              } else {
                this.$message.error(this.message)
              }
            })
        } else {
          return false
        }
      })
    },
    // 重置密码
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var data = {
            username: this.form.email,
            newPassword: this.form.password,
            captchaCode: this.form.captchaCode,
            inputCaptchaCode: this.form.inputCaptchaCode
          }
          this.submitBtn = true
          postResetpwd(data).then((res) => {
            this.submitBtn = false
            if (res.code === 200) {
              this.$refs[form].resetFields()
              this.$message.success(this.$t('pwdResetSuccessful'))
            } else {
              this.$message.error(res.message)
            }
          }).catch(()=>{
            this.submitBtn = false
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
.findpwd-title{
  font-weight: normal;
  text-align: center;
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
}
</style>
