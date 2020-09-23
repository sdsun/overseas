<template>
  <div class="pc home">
    <!-- header -->
    <golobal-header />
    <!-- carousel -->
    <el-carousel trigger="click" class="home-banner" height="550px">
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        :style="{ backgroundImage: 'url(' + item.fileUrl + ')' }"
        class="slider-item">
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <!-- vr -->
      <div class="section vr">
        <div class="w1440">
          <h2 class="common-title">{{ $t('vrShowroom') }}</h2>
          <div class="vr-item">
            <img src="https://cdnoverseas.haier.net/202009/b4991039e733470c91ce41c03de9ce9c.jpg"
              class="rep-img"
              style="height: 450px">
            <a @click="isLogin(company.vr)" class="enter-btn">
              ENTER SMART PAVILION
            </a>
          </div>
        </div>
      </div>
      <!-- live -->
      <div class="section live">
        <div class="w1440">
          <h2 class="common-title">
            {{ $t('liveVideo') }}
            <router-link class="fr" :to="{ name: 'Live' }" target="_blank">
              More
            </router-link>
          </h2>
          <div class="inner">
            <el-carousel trigger="click" @change="handleChange" height="650px">
              <el-carousel-item
                v-for="(item, index) in liveRooms1"
                :key="index"
                class="live-slider-item">
                <count-down :endTime= "endTime"/>
                <img :src="item.imgUrl" style="width: 100%; height: 650px;">
                <a @click="isLogin(item.liveUrl, item.liveUrlZh)" class="enter-btn">
                  ENTER LIVE VIDEO
                </a>
              </el-carousel-item>
            </el-carousel>
            <div class="list">
              <el-row :gutter="30">
                <el-col
                  :span="6"
                  class="item"
                  v-for="(item, index) in liveRooms0"
                  :key="index">
                  <template v-if="index < 4">
                    <a @click="isLogin(item.liveUrl)">
                      <img :src="item.imgUrl" class="rep-img" style="height: 160px">
                    </a>
                  </template>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <!-- brands -->
      <div class="section brands">
        <div class="w1440">
          <all-brands :list="brands"></all-brands>
        </div>
      </div>
      <!-- CATEGORIES -->
      <div class="section categories">
        <div class="w1440">
          <h2 class="common-title">{{ $t('productCategories') }}</h2>
          <el-row :gutter="30">
            <el-col :span="6" class="item" v-for="(item, index) in categorys" :key="index">
              <router-link :to="{name:'Exhibits', query: { id: item.id }}" target="_blank">
                <template v-if="index < 8">
                  <div class="item-img">
                    <img :src="item.logo" class="rep-img">
                  </div>
                  <h2>{{ item.name }}</h2>
                </template>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- HOT PRODUCTS -->
      <div class="section hot-products">
        <div class="w1440">
          <h2 class="common-title">{{ $t('hotProducts') }}</h2>
          <el-row :gutter="20">
            <el-col :span="8" class="item" v-for="(item, index) in hotExhibits" :key="index">
              <div class="item-img">
                <img :src="item.picFileUrl" class="rep-img">
              </div>
              <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- NEW PRODUCTS -->
      <div class="section new-products">
        <div class="w1440">
          <h2 class="common-title">{{ $t('newProducts') }}</h2>
          <el-row type="flex" :gutter="10">
            <el-col :span="6" class="item" v-for="(item, index) in newExhibits" :key="index">
              <div class="item-img">
                <img :src="item.picFileUrl" class="rep-img">
              </div>
              <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- CONTACT -->
      <div class="section contact">
        <div class="w1440">
          <h2 class="common-title">{{ $t('contactUs') }}</h2>
          <contact-us></contact-us>
        </div>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
  </div>
</template>

<script>
import CountDown from '@/components/CountDown'
import GolobalHeader from '@/components/pc/Header'
import GolobalFooter from '@/components/pc/Footer'
import AllBrands from '@/components/pc/Brands'
import ContactUs from '@/components/pc/Contact'
import { getHome } from '@/api/api'

export default {
  name: 'Home',
  components: {
    GolobalHeader,
    GolobalFooter,
    CountDown,
    AllBrands,
    ContactUs
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
          loading.close()
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
          this.endTime = this.liveRooms1 ? this.liveRooms1[0].startTime : ''
        }
      })
    },
    handleChange(index) {
      this.endTime = this.liveRooms1[index].startTime
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .section{
    margin-bottom: 30px;
  }
  .container{
    background: $main-color;
    overflow: hidden;
    padding: 20px 0;
  }
  .home-banner{
    .slider-item {
      height: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
  }
  .live{
    .live-slider-item{
      text-align: center;
    }
    .list{
      margin-top: 20px;
      a{
        cursor: pointer;
      }
    }
  }
  .categories{
    .item-img{
      background: #19286d;
    }
  }
  .categories,
  .hot-products,
  .new-products{
    .item{
      .item-img{
        overflow: hidden;
        &:hover img{
          transform: scale(1.08);
        }
      }
      img{
        transition: all .5s;
      }
      h2{
        height: 60px;
        line-height: 30px;
        margin-top: 20px;
        color: #FFF;
        font-size: 16px;
        font-weight: normal;
        text-align: center;
      }
    }
  }
}
</style>