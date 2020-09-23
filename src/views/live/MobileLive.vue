<template>
  <div class="mobile brand">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <!-- 主直播 -->
      <div class="live-main">
        <van-swipe class="top" @change="onChange">
          <van-swipe-item
            class="item"
            :loop="false"
            v-for="(item, index) in liveListBig"
            :key="index">
            <a @click="isLogin(item.liveUrl)">
              <count-down :endTime= "endTime"/>
              <img :src="item.imgUrl" class="rep-img">
            </a>
          </van-swipe-item>
        </van-swipe>
        <div class="bottom">
          <h1 class="title">Product List</h1>
          <van-swipe
            :loop="false"
            :width="120"
            :show-indicators="false">
            <van-swipe-item
              class="item"
              v-for="(item, index) in liveListBig[current].exhibitsList"
              :key="index">
              <div class="inner">
                <div class="item-img">
                  <img :src="item.picFileUrl">
                </div>
                <h2 class="ellipsis-2">{{ getLangData(item.exhibitsName) }}</h2>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!-- 辅直播 -->
      <div class="live-sub vr-list">
        <el-row :gutter="10">
          <el-col :span="12" class="item" v-for="(item, index) in liveListSmall" :key="index">
            <a @click="isLogin(item.liveUrl)">
              <div class="item-img">
                <img :src="item.imgUrl" class="rep-img">
              </div>
              <div class="item-info">
                <h2 class="ellipsis-1">{{ item.name }}</h2>
                <p>{{ item.startTime }}</p>
              </div>
            </a>
          </el-col>
        </el-row>
      </div>
      <!-- 回放 -->
      <div class="live-palyback vr-list">
        <h1 class="title">Live Playback</h1>
        <div class="list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="No more data"
            @load="onLoad"
          >
            <el-row :gutter="10">
              <el-col
                :span="12"
                class="item" 
                v-for="(item, index) in list"
                :key="index">
                <a @click="isLogin(item.liveUrl)">
                  <div class="item-img">
                    <img :src="item.imgUrl" class="rep-img">
                  </div>
                  <div class="item-info">
                    <h2 class="ellipsis-1">{{ item.name }}</h2>
                    <p>{{ item.startTime }}</p>
                  </div>
                </a>
              </el-col>
            </el-row>
          </van-list>
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
import CountDown from '@/components/CountDown'
import { getLiveroomList, getLiveroomBackList } from '@/api/api'

export default {
  name: 'Brand',
  components: {
    GolobalHeader,
    GolobalFooter,
    ContactUs,
    CountDown
  },
  data() {
    return {
      endTime: '',
      current: 0,
      liveListBig: [],
      liveListSmall: [],
      list:[],
      // 分页
      exhibitsKeyword: '',
			page_total: 0,
			page_no: 0,
			loading: false,
      finished: false,
    }
  },
  created() {
    this.handleGetLiveroomList()
  },
  methods: {
    onChange(index){
      this.current = index
      this.endTime = this.liveListBig[index].startTime
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
    initData () {
			this.noRes = false
			this.list = []
			this.page_no = 0
			this.loading = true
			this.finished = false
			if(this.loading){
				this.onLoad()
			}
    },
    onLoad() {
			// 异步更新数据
			setTimeout(() => {
				this.page_no ++
        var query = {
          page: this.page_no,
          size: 12
        }
				getLiveroomBackList({
          params: query
        }).then((res) => {
					if (res.code === 200) {
						var data = res.data
						this.list = this.list.concat(data.records)
						if(this.list.length === 0) {
							this.noRes = true
            }
						this.page_total = data.pages
						this.loading = false
						if (this.page_no >= this.page_total) {
							this.finished = true
						}
					}
				})
			}, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.live-main{
  .top{
    a{
      display: block;
      cursor: pointer;
      position: relative;
      img{
        height: 4.2rem;
      }
    }
  }
  .bottom{
    background: #F2F2F2;
    .title{
      font-size: .34rem;
      text-align: center;
      line-height: .6rem;
      font-weight: normal;
      color: #333;
    }
    .item{
      .inner{
        padding: 5px;
        img{
          display: block;
          width: 100%;
          height: 110px;
        }
        h2{
          margin: 10px 0;
          font-size: .24rem;
          font-weight: normal;
          color: #666;
        }
      }
    }
  }
}
.vr-list{
  padding: 10px;
  margin-bottom: 10px;
  .title{
    font-size: .34rem;
    line-height: .8rem;
    font-weight: normal;
    text-align: center;
  }
  .item{
    a{
      display: block;
      cursor: pointer;
      img{
        height: 2rem;
      }
      .item-info{
        font-size: .24rem;
        padding: 10px 5px;
        h2{
          font-size: .24rem;
          color: #666;
        }
      }
    }
  }
}
</style>
