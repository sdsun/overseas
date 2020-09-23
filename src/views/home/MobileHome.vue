<template>
  <div class="mobile home">
    <!-- header -->
    <golobal-header />
    <!-- banner -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          class="item"
          v-for="(item, index) in banners"
          :key="index"
          :style="{ backgroundImage: 'url(' + item.fileUrl + ')' }">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- container -->
    <div class="container">
      <!-- vr -->
      <div class="section vr">
        <h1 class="m-common-title">{{ $t('vrShowroom') }}</h1>
        <div class="inner">
          <a @click="isLogin(company.vr)">
            <img src="https://cdnoverseas.haier.net/202009/b4991039e733470c91ce41c03de9ce9c.jpg" class="rep-img">
          </a>
        </div>
      </div>
      <!-- live -->
      <div class="section live">
        <h1 class="m-common-title">
          {{ $t('liveVideo') }}
          <router-link class="fr" :to="{ name: 'Live' }" target="_blank">
            More
          </router-link>
        </h1>
        <van-swipe class="my-swipe" indicator-color="white" @change="handleChange">
          <van-swipe-item
            class="item"
            v-for="(item, index) in liveRooms1"
            :key="index">
            <div class="inner">
              <count-down :endTime= "endTime"/>
              <a @click="isLogin(item.liveUrl)">
                <img :src="item.imgUrl" class="rep-img">
              </a>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- brands -->
      <div class="section brands">
        <h1 class="m-common-title">{{ $t('allBrands') }}</h1>
        <el-row :gutter="10">
          <el-col :span="12" class="item" v-for="(item, index) in brands" :key="index">
            <router-link target="_blank" :to="{ name: 'Brand', params: { id: item.id }}">
              <div class="item-img">
                <img :src="item.fileUrl" class="rep-img">
              </div>
              <h2 class="ellipsis-2">{{ item.name }}</h2>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- categories -->
      <div class="section categories">
        <h2 class="m-common-title">{{ $t('productCategories') }}</h2>
        <el-row :gutter="10">
          <el-col :span="12" class="item" v-for="(item, index) in categorys" :key="index">
            <router-link :to="{name:'Exhibits', query: { id: item.id }}" target="_blank">
              <div class="item-img">
                <img :src="item.logo" class="rep-img">
              </div>
              <h2>{{ item.name }}</h2>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- HOT PRODUCTS -->
      <div class="section hot-products">
        <h2 class="m-common-title">{{ $t('hotProducts') }}</h2>
        <div class="list">
          <div class="item" v-for="(item, index) in hotExhibits" :key="index">
            <div class="img">
              <img :src="item.picFileUrl" class="rep-img">
            </div>
            <div class="info">
              <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- NEW PRODUCTS -->
      <div class="section new-products">
        <h2 class="m-common-title">{{ $t('newProducts') }}</h2>
        <div style="overflow: hidden">
          <van-swipe
            :loop="false"
            :width="250"
            :show-indicators="false"
            style="margin-left: -10px;">
            <van-swipe-item class="item" v-for="(item, index) in newExhibits" :key="index">
              <div class="inner">
                <div class="item-img">
                  <img :src="item.picFileUrl" class="rep-img">
                </div>
                <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
              </div>
            </van-swipe-item>
          </van-swipe>
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
import CountDown from '@/components/CountDown'
import GolobalHeader from '@/components/mobile/Header'
import GolobalFooter from '@/components/mobile/Footer'
import ContactUs from '@/components/mobile/Contact'
import { getHome } from '@/api/api'

export default {
  name: 'Home',
  components: {
    GolobalHeader,
    GolobalFooter,
    ContactUs,
    CountDown
  },
  data() {
    return {
      banners: [],
      brands: [],
      categorys: [],
      company: {},
      companyFiles: [],
      hotExhibits: [],
      newExhibits: [],
      liveRooms0: [],
      liveRooms1: [],
      endTime: ''
    }
  },
  created() {
    this.hadnleGet()
  },
  methods: {
    // 获取页面数据
    hadnleGet() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      getHome().then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.banners = data.companyFiles
          this.brands = data.brands
          this.categorys = data.categorys
          this.company = data.company
          this.hotExhibits = data.hotExhibits
          this.newExhibits = data.newExhibits
          data.liveRooms.map((item) => {
            if (item.mainFlag === '0') {
              this.liveRooms0.push(item)
            } else {
              this.liveRooms1.push(item)
            }
          })
          this.endTime = this.liveRooms1[0].startTime
          loading.close()
        }
      })
    },
    // live slider change
    handleChange(index) {
      console.log(index)
      this.endTime = this.liveRooms1[index].startTime
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .container{
    background: $main-color;
    padding: 20px;
  }
  .section{
    padding: 0.2rem 0;
  }
  .banner{
    .item{
      height: 3.1rem;
      background-position: center top;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
  }
  .live{
    .item{
      .inner{
        position: relative;
        img{
          height: 4rem;
        }
      }
    }
  }
  .brands, .categories{
    color: #FFF;
    .item{
      text-align: center;
      margin-bottom: .2rem;
      .item-img{
        background: #19276c;
      }
      h2{
        font-size: .28rem;
        line-height: .6rem;
        font-weight: normal;
        color: #FFF;
      }
    }
  }
  .hot-products{
    .list{
      .item{
        padding: .3rem;
        background: #eeeff1;
        display: flex;
        margin-bottom: 10px;
        .img{
          width: 1.8rem;
          height: 1.8rem;
        }
        .info{
          flex: 1;
          padding: .2rem;
          h2{
            font-size: .32rem;
            color: #666;
            margin-bottom: .2rem;
            font-weight: normal;
          }
        }
      }
    }
  }
  .new-products{
    .item{
      .inner{
        padding: 15px;
        background: #eee;
        margin-left: 10px;
        h2{
          font-size: .28rem;
          font-weight: normal;
          height: .8rem;
          line-height: .4rem;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>