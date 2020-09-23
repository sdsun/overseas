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
      <div class="register">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="userType">
            <el-select v-model="form.userType" placeholder="" style="width: 100%">
              <el-option :label="$t('inUser')" value="0"></el-option>
              <el-option :label="$t('outUser')" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input type="text" maxlength="30" v-model="form.nickname" :placeholder="$t('nickname')">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="text" maxlength="50" v-model="form.email" :placeholder="$t('email')">
              <i slot="prefix" class="el-input__icon iconfont icon-email" style="display:block"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if="form.userType == 1">
            <el-input type="password" maxlength="16" v-model="form.password" :placeholder="$t('password')">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password1" v-if="form.userType == 1">
            <el-input type="password" maxlength="16" v-model="form.password1" :placeholder="$t('confirmPassword')">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="inputCaptchaCode">
            <el-input type="text" maxlength="50" v-model="form.inputCaptchaCode" :placeholder="$t('verificationCode')">
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
          <el-form-item prop="region_name">
            <el-select v-model="form.region_name" :placeholder="$t('selectRegion')" style="width: 100%">
              <el-option :label="item.value" :value="item.value" v-for="(item, index) in regions" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-button
              class="user-submit-btn"
              type="primary"
              :loading="registerBtn"
              @click="onSubmit('form')">
              {{ $t('register') }}
            </el-button>
          </el-form-item>
          <el-form-item prop="agree" class="agree">
            <el-checkbox v-model="form.agree">I agree</el-checkbox>
            <span @click="$refs.privacyPolicy.show()">《Haier Privacy Policy》</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 《法律声明及隐私权政策》 -->
    <privacy-policy ref="privacyPolicy"/>
  </div>
</template>

<script>
import { getClientGetByType } from '@/api/api'
import { postSendcaptcha, postRegister } from '@/api/user'
import PrivacyPolicy from './PrivacyPolicy'

export default {
  components: {
    PrivacyPolicy
  },
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
        userType: '1',
        email: '',
        password: '',
        password1: '',
        captchaCode: '',
        inputCaptchaCode: '',
        region_name: '',
        nickname: '',
        sex: '',
        agree: []
      },
      rules: {
        nickname:  [
          { required: true, message: this.$t('registerRules.nickname'), trigger: 'change' }
        ],
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
        ],
        region_name: [
          { required: true,  message: this.$t('inquiryRules.region'), trigger: 'change' }
        ],
        agree: [
          { required: true,  message: this.$t('registerRules.agree'), trigger: 'change' }
        ]
      },
      state: {
        time: 60,
        smsSendBtn: false
      },
      registerBtn: false,
      regions: []
    }
  },
  created() {
    this.handleInit('region')
  },
  methods: {
    // 初始化地区字典
    handleInit(type) {
      getClientGetByType({
        params: {
          type: type
        }
      }).then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.regions = data
        }
      })
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
    // 注册
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.registerBtn = true
          var data = {
            username: this.form.email,
            password: this.form.password,
            regionId: this.form.region_name,
            captchaCode: this.form.captchaCode,
            inputCaptchaCode: this.form.inputCaptchaCode,
            userType: this.form.userType,
            nickname: this.form.nickname,
            sex: this.form.sex
          }
          postRegister(data).then((res) => {
            this.registerBtn = false
            if (res.code === 200) {
              this.$refs[form].resetFields()
              this.$message.success(this.$t('registerSuccess'))
            } else {
              this.$message.error(res.message)
            }
          }).catch(()=>{
            this.registerBtn = false
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
.agree{
  span{
    color: #409eff;
    cursor: pointer;
  }
}
</style>
