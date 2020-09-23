<template>
  <div class="pc live">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <!-- 顶部主直播 -->
      <div class="w living">
        <div class="main">
          <el-carousel
            trigger="click"
            :autoplay="false"
            indicator-position="none"
            @change="handleChange"
            height="505px">
            <el-carousel-item class="item" v-for="(item, index) in liveListBig" :key="index">
              <el-row :gutter="20">
                <!-- 直播封面 -->
                <el-col class="left" :span="18">
                  <a @click="isLogin(item.liveUrl, item.liveUrlZh)">
                    <count-down :endTime= "endTime"/>
                    <img :src="item.imgUrl" style="width: 100%; height: 505px">
                  </a>
                </el-col>
                <!-- 关联产品 -->
                <el-col class="right" :span="6">
                  <h2>Product List</h2>
                  <vue-scroll :ops="ops">
                    <div class="list">
                      <dl class="item" v-for="(item, index) in item.exhibitsList" :key="index">
                        <dt><img :src="item.picFileUrl"></dt>
                        <dd>
                          {{ getLangData(item.exhibitsName) }}
                        </dd>
                      </dl>
                    </div>
                  </vue-scroll>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="live-list living" style="margin-top: 25px">
          <el-row :gutter="10">
            <el-col :span="6" class="item" v-for="(item, index) in liveListSmall" :key="index">
              <span class="status">LIVE</span>
              <a @click="isLogin(item.liveUrl, item.liveUrlZh)">
                <div class="item-img">
                  <img :src="item.imgUrl" class="rep-img">
                </div>
                <div class="item-info">
                  <h2 class="ellipsis-1">{{ item.name }}</h2>
                  <p>Start Time：{{ item.startTime }}</p>
                </div>
              </a>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 回放 -->
      <div class="live-list playback">
        <h2 class="title">Live Playback</h2>
        <div class="w" ref="list">
            <div class="list" v-loading="loading">
              <template v-if="list.length > 0">
                <el-row :gutter="10">
                  <el-col :span="6" class="item" v-for="(item, index) in list" :key="index">
                    <span class="status">PLAYBACK</span>
                    <a @click="isLogin(item.liveUrl, item.liveUrlZh)">
                      <div class="item-img">
                        <img :src="item.imgUrl" class="rep-img">
                      </div>
                      <div class="item-info">
                        <h2 class="ellipsis-1">{{ item.name }}</h2>
                        <p>Start time：{{ item.startTime }}</p>
                      </div>
                     </a>
                  </el-col>
                </el-row>
              </template>
              <template v-else>
                <div class="no-result" style="text-align: center; color: #999;">
                  No more data
                </div>
              </template>
            </div>
            <div class="page">
              <el-pagination
                v-if="list.length > 0"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-count="pageToal">
              </el-pagination>
            </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import CountDown from '@/components/CountDown'
import GolobalHeader from '@/components/pc/Header'
import GolobalFooter from '@/components/pc/Footer'
import { getLiveroomList, getLiveroomBackList } from '@/api/api'

export default {
  name: 'Live',
  components: {
    GolobalHeader,
    GolobalFooter,
    CountDown,
    VueScroll
  },
  data() {
    return {
      endTime: '',
      liveListBig: [],
      liveListSmall: [],
      ops: {
        rail: {
          background: '#F2F2F2',
          opacity: 0,
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
      // 回放直播
      list: [],
      loading: false,
      page: 1,
      pageToal: 0
    }
  },
  created() {
    this.handleGetLiveroomList()
    this.handleGetLiveroomBackList()
  },
  methods: {
    handleChange(index) {
      this.endTime = this.liveListBig[index].startTime
    },
    // 回到列表顶部
    goListTop() {
      var elementTop = this.$refs.list.offsetTop
      window.scrollTo(0, elementTop)
    },
    // 获取直播数据
    handleGetLiveroomList() {
      getLiveroomList().then((res) => {
        if (res.code === 200) {
          var data = res.data
          data.map((item) => {
            if (item.mainFlag === '0') {
              this.liveListSmall.push(item)
            } else {
              this.liveListBig.push(item)
            }
          })
          this.endTime = this.liveListBig[0].startTime
        }
      })
    },
    // 获取分页数据
    handleGetLiveroomBackList(v) {
      var query = {
        page: this.page,
        size: 12
      }
      this.loading = true
      getLiveroomBackList({
        params: query
      }).then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.list =  data.records
          this.pageToal = data.pages
          this.loading = false
          if (v) {
            this.goListTop()
          }
        }
      })
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.page = val
      this.handleGetLiveroomBackList('changeNum')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 20px 0;
  background: #f2f2f2;
}
.living{
  margin-bottom: 20px;
  .left{

    a{
      display: block;
      cursor: pointer;
      position: relative;
    }
  }
  .right{
    background: #FFF;
    h2{
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
    .list{
      height: 465px;
      box-sizing: border-box;
      padding: 15px;
      dl{
        overflow: hidden;
        padding: 5px 0;
        dt{
          float: left;
          width: 80px;
          height: 80px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        dd{
          padding: 5px;
          margin-left: 80px;
          font-size: 14px;
          line-height: 20px;
          color: #666;
        }
      }
    }
  }
}
.live-list{
  .title{
    text-align: center;
    padding: 25px;
    font-size: 32px;
    font-weight: normal;
    color: #333;
  }
  .item{
    margin-bottom: 10px;
    position: relative;
    .status{
      display: inline-block;
      padding: 0 15px;
      color: #FFF;
      position: absolute;
      right: 15px;
      top: 10px;
      height: 24px;
      line-height: 24px;
      border-radius: 12px;
      font-size: 12px;
    }
    a{
      display: block;
      background: #FFF;
      cursor: pointer;
      transition: all .5s;
      &:hover{
        box-shadow: 0 2px 30px #AAA;
      }
      img{
        display: block;
        height: 160px;
      }
      .item-info{
        padding: 10px;
        h2{
          font-size: 15px;
          color: #666;
          font-weight: normal;
          margin-bottom: 10px;
        }
        p{
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
.living .status{
  background: #d70d19;
}
.playback .status{
  background: rgba(0, 0, 0, .3);
}
.page{
  padding: 20px 0;
  text-align: center;
}
</style>
