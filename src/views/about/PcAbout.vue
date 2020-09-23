<template>
  <div class="pc about">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <div class="w1440">
        <el-row class="profile">
          <el-col :span="12" class="video">
            <video
              width="100%"
              height="340"
              :src="video.fileUrl"
              :poster="video_img"
              controls>
            </video>
          </el-col>
          <el-col :span="12" class="desc">
            <div style="padding: 20px">
              <div class="inner">
                <vue-scroll :ops="ops">
                  <div class="textarea" v-html="getLangData(info)"></div>
                </vue-scroll>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="list-info">
          <el-col :span="12" class="item">Business Type:  Industry and Trade Enterprise</el-col>
          <el-col :span="12" class="item">Year of establishment: 1984</el-col>
          <el-col :span="12" class="item">National city: Qingdao, China</el-col>
          <el-col :span="12" class="item">Registered capital: 10 billion</el-col>
          <el-col :span="12" class="item">Target customers:  manufacturers, wholesalers</el-col>
          <el-col :span="12" class="item">Main markets:  domestic, Southeast Asia</el-col>
        </el-row>
        <div class="list-imgs">
          <vue-scroll :ops="ops" style="width: 100%; height: 180px">
            <div class='content' :style="{ width: 300*(imgs.length) + 'px' }">
              <div class="item" v-for="(item, imgindex) in imgs" :key="imgindex">
                <img :src="item.fileUrl" class="rep-img" @click="index = imgindex">
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
      <!-- system -->
      <div class="w1440">
        <img src="https://cdnoverseas.haier.net/sys/a428c131670149dea97f5f8a35bcfe1c.png" class="rep-img">
      </div>
      <!-- brands -->
      <div class="w1440">
        <all-brands :list="brands"></all-brands>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
    <!-- company images preview -->
    <CoolLightBox 
      :items="items" 
      :index="index"
      @close="index = null">
    </CoolLightBox>
  </div>
</template>

<script>
import { getAbout } from '@/api/api'
import VueScroll from 'vuescroll'
import GolobalHeader from '@/components/pc/Header'
import GolobalFooter from '@/components/pc/Footer'
import AllBrands from '@/components/pc/Brands'
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  name: 'About',
  components: {
    VueScroll,
    GolobalHeader,
    GolobalFooter,
    AllBrands,
    CoolLightBox
  },
  data() {
    return {
      info: '',
      video: {},
      video_img: '',
      imgs: [],
      brands: [],
      ops: {
        rail: {
          background: '#183682',
          opacity: 1,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '0',
          keepShow: false,
          border:'none'
        },
        bar: {
          hoverStyle: true,    
          onlyShowBarOnScroll: true,
          background: '#a6a9b7'
        }
      },
      index: null,
      items: []
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
          this.imgs.map((item) => {
            this.items.push(item.fileUrl)
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
  background: $main-color;
  padding: 15px 0;
}
.about{
  .profile{
    margin-bottom: 40px;
    .video{
      height: 340px;
      background: #FFF;
      video{
        object-fit:fill; 
      }
    }
    .desc{
      height: 340px;
      background: #183682;
      .inner{
        height: 300px;
        font-size: 16px;
        color: #d1d4e2;
        line-height: 160%;
        p{
          margin-bottom: 10px;
        }
      }
    }
  }
  .list-info{
    margin-bottom: 40px;
    .item{
      border-bottom: 1px solid #596d9b;
      height: 40px;
      line-height: 40px;
      color: #d1d4e2;
      font-size: 16px;
      text-indent: 20px;
    }
  }
  .list-imgs{
    margin-bottom: 40px;
    .content{
      white-space:nowrap;
      font-size: 0;
      .item{
        display: inline-block;
        width: 300px;
        box-sizing: border-box;
        padding: 0 10px;
        img{
          width: 100%;
          height: 160px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
