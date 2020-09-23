<template>
  <div>
    <div class="user-btn">
      <router-link class="btn" :to="{ name: 'Login' }">
        {{ $t('login') }}
      </router-link>
      <router-link class="btn" :to="{ name: 'Register' }">
        {{ $t('register') }}
      </router-link>
    </div>
    <div class="user-content">
      <div class="login">
        <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input type="text" maxlength="50" v-model="form.username" :placeholder="$t('email')">
              <i slot="prefix" class="el-input__icon iconfont icon-email" style="display:block"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="showPwd?'text':'password'" maxlength="16" v-model="form.password" :placeholder="$t('password')">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              <i
                style="font-size: 16px; z-index: 99"
                class="iconfont"
                :class="[ showPwd ? 'icon-eyeopen' : 'icon-eyeclose' ]" 
                slot="suffix"
                @click.stop="handleChangePwdType">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <router-link style="color: #059bda;" :to="{ name: 'FindPwd' }">
              {{ $t('forgotPassword') }}
            </router-link>
          </el-form-item>
          <el-form-item>
            <el-button
              class="user-submit-btn"
              native-type="submit"
              :loading="loginBtn"
              type="primary"
              @click="onSubmit('form')">
              {{ $t('login') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsertype } from '@/api/user'

export default {
  data() {
    return {
      showPwd: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: this.$t('loginRules.username'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('loginRules.password'), trigger: 'blur' }
        ]
      },
      loginBtn: false
    }
  },
  methods: {
    // 改变密码
    handleChangePwdType() {
      this.showPwd = !this.showPwd
    },
    // 登陆
    handleLogin(type) {
      this.loginBtn = false
      if (type === 0) {
        // 内部登录
        var adLoginForm = {
          account: this.form.username,
          password: this.form.password
        }
        this.$store.dispatch('LoginAd', adLoginForm)
          .then((res) => {
            if (res.code === 200) {
              this.$router.push('/')
            } else {
              this.$message.error(res.message)
              this.loginBtn = false
            }
          })
      } else {
        // 外部登陆
        var formData = new FormData();
        formData.append("username", this.form.username)
        formData.append("password", this.form.password)
        this.$store.dispatch('Login', formData)
          .then((res) => {
            if (res.code === 200) {
              this.$router.push('/')
            } else {
              this.$message.error(res.message)
              this.loginBtn = false
            }
          })
      }
    },
    // 提交登陆信息
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loginBtn = true
          // 调用接口获取用户类型
          getUsertype({
            params: {
              userName: this.form.username
            }
          }).then((res) => {
            if(res.code === 200) {
              var data = res.data
              if (data.hasLogged) {
                // 提示已经登录，是否去登录
                this.$confirm('The account is already logged in elsewhere', 'Friendly reminder', {
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No',
                  type: 'warning'
                }).then(() => {
                  this.handleLogin(data.userType)
                }).catch(() => {
                  this.loginBtn = false
                })
              } else {
                this.handleLogin(data.userType)
              }
            } else {
              this.$message.error(res.message)
              this.loginBtn = false
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
