<template>
  <div class="mobile brand">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <!-- banner -->
      <div class="banner">
        <img :src="bannerUrl" class="rep-img">
      </div>
      <!-- desc -->
      <div class="about">
        <h1>{{ $t('aboutUs') }}</h1>
        <div class="info" v-html="detail">
        </div>
      </div>
      <div class="section-box">
        <!-- vr -->
        <div class="section vr" v-if="vrs">
          <h1 class="m-common-title" :style="{background: currentColor.titleBg}">
            {{ $t('vrShowroom') }}
          </h1>
          <van-swipe class="my-swipe" indicator-color="white">
            <van-swipe-item
              class="item"
              v-for="(item, index) in vrs"
              :key="index">
              <img :src="item.imgUrl" class="rep-img" style="height: 3rem">
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- hot product -->
        <div class="section hot-products">
          <h1 class="m-common-title" :style="{background: currentColor.titleBg}">
            {{ $t('hotProducts') }}
          </h1>
          <el-row :gutter="10">
            <el-col :span="12" class="item" v-for="(item, index) in hotExhibits" :key="index">
              <div class="item-img">
                <img :src="item.picFileUrl" class="rep-img">
              </div>
              <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
    <!-- contact -->
    <contact-us />
  </div>
</template>

<script>
import GolobalHeader from '@/components/mobile/Header'
import GolobalFooter from '@/components/mobile/Footer'
import ContactUs from '@/components/mobile/Contact'
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
          loading.close()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about{
  padding: .5rem;
  h1{
    font-size: .34rem;
    margin-bottom: .3rem;
  }
  .info{
    line-height: 160%;
    font-size: .24rem;
    p{
      margin-bottom: 10px;
    }
  }
}
.section{
  margin-bottom: 20px;
}
.section-box{
  padding: .4rem;
  background: #000;
}
.hot-products{
  .item{
    h2{
      font-size: .26rem;
      color: #FFF;
      font-weight: normal;
      margin: 10px 0;
    }
  }
}
</style>
