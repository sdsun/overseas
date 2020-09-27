<template>
  <div class="pc productlist">
    <!-- header -->
    <golobal-header />
    <!-- container -->
    <div class="container">
      <div class="region-box">
        <div class="w" style="overflow: hidden;">
          <el-row class="region-list" type="flex" :gutter="20">
            <el-col
              class="item"
              v-for="(item, index) in regions"
              :key="index">
              <span
                @click="handleClickRegion(item)"
                :class="{ 'active': regionId == item.id }">
                {{ item.description }}
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- categories -->
      <div class="categories">
        <div class="w1440" style="overflow: hidden;">
          <el-row class="list" type="flex" :gutter="20">
            <el-col
              class="item"
              v-for="(item, index) in cates"
              :key="index"
              :style="{ width: cates.length <=5 ? '20%' : 'auto'}">
              <div
                class="inner"
                :class="{ 'active': currentCate == item.id }"
                @click="handleChangeCate(item)">
                <img :src="item.logo" class="rep-img" :alt="item.name">
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- banner -->
      <div class="w1440" v-if="banner">
        <img :src="banner" class="rep-img">
      </div>
      <!-- goods-list -->
      <div class="goods-box" ref="list">
        <div class="w1440">
          <!-- sub nav -->
          <div class="sub-nav">
            <el-row class="list" type="flex">
              <el-col
                class="item"
                v-for="(item, index) in subCates"
                :key="index">
                <span
                  :class="{ 'active': currentSubCate == item.id }"
                  @click="handleChangeSubCate(item)">
                  {{ item.name }}
                </span>
              </el-col>
            </el-row>
          </div>
          <div class="goods-box-inner">
            <div class="goods-list" v-loading="loading">
              <template v-if="list.length > 0">
                <dl v-for="(item, index) in list" :key="index">
                  <dt>
                    <img :src="item.picFileUrl" class="rep-img">
                  </dt>
                  <dd>
                    <div class="rn">
                      <h2>
                        {{ getLangData(item.exhibitsName) }}
                        <el-button size="mini" round @click="handleDownload(item.id, getLangData(item.exhibitsName), getLangData(item.exhibitsDiffSellPoint))">Download</el-button>
                      </h2>
                      <ul>
                        <template v-if="$i18n.locale == 'en'">
                          <li
                            v-for="(nitem, index) in JSON.parse(item.exhibitsDiffSellPoint).en_US"
                            :key="index">
                            {{ nitem }}
                          </li>
                        </template>
                        <template v-if="$i18n.locale == 'ja'">
                          <li
                            v-for="(nitem, index) in JSON.parse(item.exhibitsDiffSellPoint).ri_JA"
                            :key="index">
                            {{ nitem }}
                          </li>
                        </template>
                      </ul>
                    </div>
                  </dd>
                </dl>
              </template>
              <template v-else>
                <div class="no-result">
                  No More Data
                </div>
              </template>
            </div>
            <div class="page">
              <el-pagination
                v-if="pageToal > 0"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-count="pageToal">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 导出产品文案 -->
    <div id="export-text" style="display: none;">
      <p>11</p>
      <p>11</p>
    </div>
    <!-- footer -->
    <golobal-footer />
  </div>
</template>

<script>
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import GolobalHeader from '@/components/pc/Header'
import GolobalFooter from '@/components/pc/Footer'
import { getClientGetRegion, getCate, getSubCate, getProductList, getExhibitsFiles } from '@/api/api'

const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer'
    }).then(data => {
      resolve(data.data)
    }).catch(error => {
      reject(error.toString())
    })
  })
}

export default {
  name: 'ProductList',
  components: {
    GolobalHeader,
    GolobalFooter
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
      loading: false,
      // 分页
      exhibitsKeyword: '',
      page: 1,
      pageToal: 0
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
    // 回到列表顶部
    goListTop() {
      var elementTop = this.$refs.list.offsetTop
      window.scrollTo(0, elementTop)
    },
    // 选择region
    handleClickRegion(item) {
      this.regionId = item.id
    },
    // 改变一级分类
    handleChangeCate(item) {
      this.currentCate = item.id
      this.handleGetSubCate(item.id)
      this.banner = item.banner
    },
    // 改变二级分类
    handleChangeSubCate(item) {
      this.page = 1
      this.currentSubCate = item.id
      this.banner = item.banner
      this.handleGetProductList()
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.page = val
      this.handleGetProductList('changeNum')
    },
    // 获取区域
    hadnleGetClientGetRegion(){
      getClientGetRegion().then((res) => {
        if(res.code === 200) {
          this.regions = res.data
        }
      })
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
      this.banner = ''
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
          this.handleGetProductList()
        }
      })
    },
    // 获取分页数据
    handleGetProductList(v) {
      var query = {
        exhibitsKeyword: this.exhibitsKeyword,
        exhibitsStatus: 1,
        categoryId: this.currentSubCate,
        page: this.page,
        size: 10
      }
      this.list = []
      this.loading = true
      getProductList({
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
    // 下载文件
    handleDownload (id, name, diff) {
      getExhibitsFiles(id).then((response) =>{
        if (response.code === 200) {
          const promises = []
          const zip = new JSZip()
		  var file = new File([
			   `<h1>${ name }</h1>\n ${diff}`
			], "",
			{type: "text/plain;charset=utf-8"}
		  );
		  var fileReader = new FileReader();
		  fileReader.readAsArrayBuffer(file);
		  fileReader.onload = function() {
			zip.file( name+'.doc', fileReader.result, { binary: true })
		  }
          response.data.forEach((item,index)=>{
            if(item!=null){
              let fileName=item.substring(item.lastIndexOf("/")+1,item.length)
              const promise = getFile('https://cdnoverseas.haier.net/'+item).then(data => {
                zip.file(fileName, data, { binary: true })
              })
              promises.push(promise)
            }
          })
          Promise.all(promises).then(() => {
            const loading = this.$loading({
              lock: true,
              text: 'Downloading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            zip.generateAsync({type: "blob"}).then(content => {
              FileSaver.saveAs(content, name + ".zip")
              loading.close()
            }).catch(() => {
              loading.close()
            })
          }).catch(() => {
            this.$message.error('Download failed')
          })
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  background: $main-color;
}
.no-result{
  padding: 40px 0;
  text-align: center;
  color: #AAA;
  font-size: 14px;
}
.region-box{
  background: #19276c;
  padding: 15px 0;
  .region-list{
    font-size: 18px;
    color: #1e96ff;
    overflow: hidden;
    .item{
      border-left: 1px solid #1e96ff;
      height: 30px;
      line-height: 30px;
      text-align: center;
      span{
        display: block;
        cursor: pointer;
        &.active{
          color: #FFF;
        }
      }
    }
  }
}
.categories{
  padding: 20px 0;
  h1{
    font-size: 24px;
    color: #FFF;
    margin-bottom: 20px;
  }
  .list{
    .item{
      flex: 1;
      .inner{
        background: #19276c;
        max-width: 180px;
        cursor: pointer;
        &.active{
          background: #1f7dd5;
        }
      }
    }
  }
}
.goods-box{
  padding: 20px 0;
  .sub-nav{
    background: #19276c;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: #FFF;
    overflow: hidden;
    .item{
      text-align: center;
      border-left: 1px solid #1d3f8e;
      cursor: pointer;
      span{
        display: block;
        &.active{
          background: #1f7dd5;
        }
      }
    }
  }
  .goods-box-inner{
    padding: 20px;
    background: #f1f2f3;
    .goods-list{
      overflow: hidden;
      dl{
        overflow: hidden;
        margin-bottom: 15px;
        dt{
          width: 340px;
          height: 340px;
          background: #FFF;
          float: left;
        }
        dd{
          margin-left: 355px;
          background: #FFF;
          height: 340px;
          .rn{
            padding: 30px;
            overflow: hidden;
            h2{
              font-size: 28px;
              font-weight: bold;
              color: #19276c;
              margin-bottom: 20px;
            }
            ul{
              color: #666;
              font-size: 18px;
              line-height: 32px;
              list-style: square;
              li{
                width: 48%;
                margin-left: 2%;
                float: left;
                list-style: square;
              }
            }
          }
        }
      }
    }
    .page{
      padding: 20px 0;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.page{
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .el-pager li{
    background: #F8F8F8;
  }
}
</style>
