<template>
  <div class="header-box">
    <!-- 头部 -->
    <div class="header">
      <div class="w cf">
        <div class="logo fl">
          <a href="/">
            <img src="@/assets/images/logo.png" alt="haier overseas experience platform">
          </a>
        </div>
        <div class="top-bar fr">
          <top-tool />
        </div>
      </div>
    </div>
    <div class="nav-box">
      <div class="w cf">
        <div class="nav fl">
          <router-link to="/">{{ $t('routes.Home') }}</router-link>
          <router-link to="/exhibits/list">{{ $t('routes.Exhibits') }}</router-link>
          <router-link to="/live">{{ $t('routes.Live') }}</router-link>
          <router-link to="/about">{{ $t('routes.About') }}</router-link>
        </div>
        <div class="search fr">
          <el-input v-model="value" :placeholder="$t('searchProduct')">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopTool from '@/components/TopTool'

export default {
  components: {
    TopTool
  },
  data() {
    return{
      brands: [],
      value: ''
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      console.log('搜索')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-box{
  .header{
    padding: 5px 0;
    background: #000034;
    .logo{
      a{
        display: block;
        width: 375px;
        height: 45px;
        img{
          width: 375px;
          height: 45px;
        }
      }
    }
    .top-bar{
      margin-top: 2px;
    }
  }
  .nav-box{
    background: #e4e4e4;
    position: relative;
    .nav{
      height: 68px;
      line-height: 68px;
      font-size: 16px;
      .router-link-exact-active{
        color: #d70d19 !important;
      }
      a{
        padding-right: 30px;
        font-weight: bold;
        color: #333;
        transition: all .5s;
        &:hover{
          color: #d70d19;
          .subnav{
            display: block;
          }
        }
      }
      .el-dropdown-link {
        font-size: 16px;
        cursor: pointer;
        color: #333;
        font-weight: bold;
        margin-right: 20px;
      }
    }
    .search{
      margin-top: 14px;
    }
  }
}
</style>