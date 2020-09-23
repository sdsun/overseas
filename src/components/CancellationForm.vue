<template>
  <el-dialog
    :title="$t('cancelAccount')"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="email">
        <el-input type="text" maxlength="50" v-model="form.email" :placeholder="$t('email')">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" :loading="submitBtn" @click="onSubmit('form')">
        {{ $t('submit') }}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
  import api from '@/api/index'
  import { postUserCancel, postSendcaptcha } from '@/api/user'

  export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          email: '',
          captchaCode: '',
          inputCaptchaCode: ''
        },
        rules: {
          email: [
            { required: true, message: this.$t('registerRules.username'), trigger: 'change' }
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
      // 显示注销表单
      show(){
        this.dialogVisible = true
      },
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
      // 注销账号
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            var data = {
              username: this.form.email,
              captchaCode: this.form.captchaCode,
              inputCaptchaCode: this.form.inputCaptchaCode
            }
            this.submitBtn = true
            postUserCancel(data).then((res) => {
              this.submitBtn = false
              if (res.code === 200) {
                this.$refs[form].resetFields()
                this.$message.success(this.$t('cancelAccountSuccess'))
                this.$store.dispatch('Logout').then(()=>{
                  window.location.reload()
                })
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