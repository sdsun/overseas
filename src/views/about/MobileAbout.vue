<template>
  <div class="mobile about">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <div class="section profile">
        <div class="video">
          <video
            width="100%"
            height="100%"
            :src="video.fileUrl"
            controls>
          </video>
        </div>
        <div class="desc">
          <div class="inner">
            <div class="textarea" v-html="getLangData(info)"></div>
          </div>
        </div>
      </div>
      <!-- system -->
      <div class="section">
        <img src="https://cdnoverseas.haier.net/sys/3e00855a918744669714377d960b285a.png" class="rep-img">
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
import { getAbout } from '@/api/api'

export default {
  name: 'Home',
  components: {
    GolobalHeader,
    GolobalFooter,
    ContactUs
  },
  data() {
    return {
      info: '',
      video: {},
      video_img: '',
      imgs: [],
      brands: []
    }
  },
  created() {
    this.handleGet()
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
      getAbout().then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.info = data.info
          this.files = data.files
          this.brands = data.brands
          this.files.map((item) => {
            if(item.type == '3') {
              this.imgs.push(item)
            } else if (item.type == '4') {
              this.video = item
            } else if(item.type == '5') {
              this.video_img = item.fileUrl
            }
          })
          loading.close()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 20px;
  background: #184090;
  color: #FFF;
  font-size: .28rem;
  .video{
    height: 3.4rem;
    video{
      object-fit:fill; 
    }
  }
  .desc{
    line-height: 160%;
    padding: 20px 5px;
    p{
      margin-bottom: 10px;
    }
  }
  .brands{
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
}
.section{
  margin-bottom: 20px;
}
</style>
