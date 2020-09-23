<template>
  <div class="mobile productlist">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <div class="regions">
        <van-swipe
          :loop="false"
          :width="60"
          :show-indicators="false">
          <van-swipe-item class="item" v-for="(item, index) in regions" :key="index">
            <span
              @click="handleClickRegion(item)"
              :class="{ 'active': regionId == item.id }">
              {{ item.description }}
            </span>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- categories -->
      <div class="categories">
        <div class="list">
          <div class="item" v-for="(item, index) in cates" :key="index">
            <div
              class="inner"
              :class="{ 'active': currentCate == item.id }"
              @click="handleChangeCate(item)">
              <img :src="item.logo" class="rep-img" :alt="item.name">
            </div>
          </div>
        </div>
      </div>
      <!-- banner -->
      <div class="banner">
        <img :src="banner" class="rep-img">
      </div>
      <div class="subnav">
        <van-tabs
          v-model="active"
          background="#19276c"
          title-inactive-color="#fff"
          title-active-color="#fff"
          :ellipsis="false">
          <van-tab
            v-for="(item, index) in subCates"
            :key="index"
            :name="item.id">
            <div
              class="tab-title"
              slot="title"
              @click="handleChangeSubCate(item)">
              {{ item.name }}
            </div>
            <!-- goods-list -->
            <div class="goods-list">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="No more data"
                @load="onLoad"
              >
                <dl v-for="(item, index) in list" :key="index">
                  <dt>
                    <img :src="item.picFileUrl" class="rep-img">
                  </dt>
                  <dd>
                    <div class="rn">
                      <h2 class="ellipsis-3">{{ getLangData(item.exhibitsName) }}</h2>
                      <div class="more">
                        <span @click="viewMore(item)">More</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </van-list>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- footer -->
    <golobal-footer />
    <!-- contact -->
    <contact-us />
    <!-- 展品参数 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '100%'}">
      <div class="view-box">
        <ul>
          <template v-if="$i18n.locale == 'en'">
            <li
              v-for="(nitem, index) in exhibitsDiffSellPoint"
              :key="index">
              {{ nitem }}
            </li>
          </template>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import GolobalHeader from '@/components/mobile/Header'
import GolobalFooter from '@/components/mobile/Footer'
import ContactUs from '@/components/mobile/Contact'
import { getClientGetRegion, getCate, getSubCate, getProductList } from '@/api/api'

export default {
  name: 'Home',
  components: {
    GolobalHeader,
    GolobalFooter,
    ContactUs
  },
  data() {
    return {
      regions: [],
      regionId: '',
      banner: '',
      cates: [],
      currentCate: '',
      subCates: [],
      currentSubCate: '',
      list: [],
      active: 1,
      // 分页
      exhibitsKeyword: '',
			page_total: 0,
			page_no: 0,
			loading: false,
      finished: false,
      // 更多展品参数
      show: false,
      exhibitsDiffSellPoint: ''
    }
  },
  created() {
    this.handleGetCate()
    this.hadnleGetClientGetRegion()
  },
  watch: {
    '$route' (to, from) {
      this.handleGetCate()
    }
  },
  methods: {
    // 获取区域
    hadnleGetClientGetRegion(){
      getClientGetRegion().then((res) => {
        if(res.code === 200) {
          this.regions = res.data
        }
      })
    },
    // 选择region
    handleClickRegion(item) {
      this.regionId = item.id
    },
    // 改变一级分类
    handleChangeCate(item) {
      this.currentCate = item.id
      this.active = 1
      this.handleGetSubCate(item.id)
      this.banner = item.banner
    },
    // 改变二级分类
    handleChangeSubCate(item) {
      this.list = []
      this.currentSubCate = item.id
      this.banner = item.banner
      this.initData()
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
    // 获取产品一级分类
    handleGetCate() {
      getCate({
        params: {
          brandId: ''
        }
      }).then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.cates = data
          this.currentCate = this.$route.query.id ? this.$route.query.id : data[0].id
          this.handleGetSubCate(this.currentCate)
        }
      })
    },
    // 获取产品二级分类
    handleGetSubCate(pid) {
      getSubCate({
        params: {
          pid: pid
        }
      }).then((res) => {
        if(res.code === 200) {
          var data = res.data
          this.subCates = data
          this.banner = data[0].banner
          this.currentSubCate = data[0].id
          this.initData()
        }
      })
    },
    onLoad() {
			// 异步更新数据
			setTimeout(() => {
				this.page_no ++
				var query = {
          exhibitsKeyword: this.exhibitsKeyword,
          exhibitsStatus: 1,
          categoryId: this.currentSubCate,
          page: this.page_no,
          size: 10
				}
				getProductList({
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
    },
    // 查看参数
    viewMore(item) {
      this.show = true
      if (this.$i18n.locale == 'en') {
        this.exhibitsDiffSellPoint = JSON.parse(item.exhibitsDiffSellPoint).en_US
      } else {
        this.exhibitsDiffSellPoint = JSON.parse(item.exhibitsDiffSellPoint).ri_JA
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section{
  margin-bottom: 20px;
}
.container{
  padding: 0 15px 20px 15px;
  background: #184090;
  font-size: .28rem;
  .regions{
    .item{
      font-size: 14px;
      padding: 20px 0;
      text-align: center;
      span{
        display: block;
        cursor: pointer;
        color: #1e96ff;
        &.active{
          color: #FFF;
        }
      }
    }
  }
  .categories{
    margin-bottom: 5px;
    .list{
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 20%;
        padding: 5px;
        box-sizing: border-box;
        .inner{
          background: #19276c;
          &.active{
            background: #1f7dd5;
          }
        }
      }
    }
  }
  .banner,.subnav{
    padding:0 5px;
  }
  .goods-list{
    background: #f1f2f3;
    padding: .2rem;
    dl{
      display: flex;
      margin-bottom: .2rem;
      dt{
        width: 2.5rem;
        height: 2.5rem;
        background: #FFF;
        margin-right: .2rem;
      }
      dd{
        flex: 1;
        background: #FFF;
        .rn{
          padding: .2rem;
          h2{
            font-size: .28rem;
            line-height: .34rem;
            font-weight: bold;
            color: #19276c;
            margin-bottom: .3rem;
          }
          .more{
            span{
              display: inline-block;
              padding: 4px 10px;
              border: 1px solid #e2e2e2;
              color: #666;
            }
          }
        }
      }
    }
  }
}
.view-box{
  padding: 40px 20px;
  ul{
    li{
      padding: 10px 0;
      line-height: 24px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
<style lang="scss">
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after{
  border: none;
}
.van-tab{
  padding: 0 10px !important;
}
</style>
