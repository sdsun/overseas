<template>
  <div class="pc brand">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <!-- banner -->
      <div class="banner" :style="{ backgroundImage: 'url(' + bannerUrl + ')' }"></div>
      <!-- desc -->
      <div class="w">
        <div class="desc">
          <h1>{{ $t('aboutUs') }}</h1>
          <div class="info" v-html="detail"></div>
        </div>
      </div>
      <!-- sections -->
      <div class="section-box" :style="{ background: currentColor.bg }">
        <!-- vr -->
        <div class="section vr" v-if="vrs">
          <div class="w1440">
            <h1 class="common-title" :style="{background: currentColor.titleBg}">
              {{ $t('vrShowroom') }}
            </h1>
            <div class="content">
              <el-carousel class="vr-list" trigger="click" height="500px">
                <el-carousel-item
                  v-for="(item, index) in vrs"
                  :key="index">
                  <div style="position: relative; text-align:center;">
                    <img :src="item.imgUrl" class="rep-img" style="height: 500px">
                    <a :href="item.vrLink" class="enter-btn">
                      ENTER SMART PAVILION
                    </a>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <!-- hot product -->
        <div class="section hot-products">
          <div class="w1440">
            <h1 class="common-title" :style="{background: currentColor.titleBg}">
              {{ $t('hotProducts') }}
            </h1>
            <el-row :gutter="20">
              <el-col :span="8" class="item" v-for="(item, index) in hotExhibits" :key="index">
                <div class="item-img">
                  <img :src="item.picFileUrl" class="rep-img">
                </div>
                <h2 class="ellipsis-2">
                  {{ getLangData(item.exhibitsName) }}
                </h2>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- contact -->
        <div class="section contact">
          <div class="w1440">
            <h2 class="common-title" :style="{background: currentColor.titleBg}">
              {{ $t('contactUs') }}
            </h2>
            <contact-us></contact-us>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
  </div>
</template>

<script>
import GolobalHeader from '@/components/pc/Header'
import GolobalFooter from '@/components/pc/Footer'
import ContactUs from '@/components/pc/Contact'
import { getBrand } from '@/api/api'

export default {
  name: 'Brand',
  components: {
    GolobalHeader,
    GolobalFooter,
    ContactUs
  },
  data() {
    return {
      bannerUrl: '',
      detail: '',
      hotExhibits: [],
      vrs: [],
      currentColor: {},
      colorArr: [
        {
          bg: '#222',
          titleBg: '#444' 
        },
        {
          bg: '#0056a9',
          titleBg: '#1b9fea' 
        }
      ]
    }
  },
  created() {
    this.handleGet()
    this.currentColor = this.colorArr[Math.floor((Math.random()*this.colorArr.length))]
  },
  methods: {
    // 获取页面数据
    handleGet() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      getBrand({
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.bannerUrl = data.bannerUrl
          this.detail = data.detail
          this.hotExhibits = data.hotExhibits
          this.vrs = data.vrs
          loading.close()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.brand{
  .banner{
    height: 600px;
    background-repeat: no-repeat;
    background-position: center top;
  }
  .desc{
    color: #2e3036;
    padding: 80px;
    h1{
      font-size: 28px;
      margin-bottom: 40px;
      font-weight: bold;
    }
    .info{
      font-size: 22px;
      p{
        margin-bottom: 15px;
      }
    }
  }
  .section-box{
    background: #000000;
    padding: 30px 0;
  }
  .section {
    padding-bottom: 40px;
  }
  .hot-products{
    .item{
      h2{
        height: 60px;
        line-height: 30px;
        margin-top: 30px;
        color: #FFF;
        font-size: 22px;
        font-weight: normal;
        text-align: center;
      }
    }
  }
}
</style>
