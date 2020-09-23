<template>
  <div class="footer">
    <div class="w">
      <div class="top">
        {{ $t('aboutUs') }}:
        <a href="https://www.facebook.com/HaierDefault/" target="_blank">
          <i class="iconfont icon-facebook"></i>
        </a>
        <a href="https://www.youtube.com/channel/UC3RXhMn6xRfuKjgdhisijkw" target="_blank">
          <i class="iconfont icon-youtube"></i>
        </a>
        <a href="https://www.instagram.com/haiergroup/" target="_blank">
          <i class="iconfont icon-instagram"></i>
        </a>
      </div>
      <div class="bottom">
        <el-row :gutter="20">
          <el-col :span="6">
            <h2>{{ $t('websiteInfo') }}</h2>
            <ul>
              <li>
                <router-link :to="{ name: 'About' }">{{ $t('aboutUs') }}</router-link>
              </li>
              <li><a @click="$refs.privacyPolicy.show()">{{ $t('privacyPolicy') }}</a></li>
            </ul>
          </el-col>
          <el-col :span="12">
            <h2>{{ $t('contactUs') }}</h2>
            <ul>
              <li>{{ $t('address') }}：{{ $t('qingDao') }}</li>
            </ul>
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer-cookie" v-if="show">
      <div class="w cf">
        <div class="fl">
          <i class="el-icon-warning-outline"></i>
          {{ $t('cookieFooter') }}
        </div>
        <div class="fr">
          <span class="sure" @click="handleSumit">
            {{ $t('ok') }}
          </span>
        </div>
      </div>
    </div>
    <!-- 《法律声明及隐私权政策》 -->
    <privacy-policy ref="privacyPolicy"/>
  </div>
</template>

<script>
import PrivacyPolicy from '@/views/user/PrivacyPolicy'

export default {
  name: 'Footer',
  components: {
    PrivacyPolicy
  },
  data() {
    return {
      show: localStorage.getItem('cookie') ? false : true
    }
  },
  methods: {
    handleSumit() {
      console.log('1')
      localStorage.setItem('cookie', 'agree')
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  background: #f7f7f7;
  padding: 40px 0;
  font-size: 16px;
  .top{
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
    a{
      display: inline-block;
      color: #444;
      padding: 0 10px;
      font-size: 24px;
      transition: transform .5s ease;
      &:hover{
        transform: translateY(-5px);
      }
      i{
        font-size: 24px;
      }
    }
  }
  .bottom{
    padding: 40px 0;
    line-height: 200%;
    color: #666;
    h2{
      font-size: 18px;
      font-weight: normal;
      margin-bottom: 10px;
      font-weight: bold;
      color: #333;
    }
    ul{
      li{
        a{
          color: #666;
          cursor: pointer;
          &:hover{
            color: #409eff;
          }
        }
      }
    }
  }
  .footer-cookie{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    padding: 10px 0;
    height: 40px;
    line-height: 40px;
    background: rgba($color: #000000, $alpha: .8);
    color: #FFF;
    font-size: 12px;
    .sure{
      padding: 10px 25px;
      border: 1px solid #FFF;
      cursor: pointer;
    }
  }
}
</style>
