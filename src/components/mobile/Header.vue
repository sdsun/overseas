<template>
  <div class="header-box">
    <!-- header -->
    <div class="header">
      <div class="cf">
        <div class="top-bar fr">
          <top-tool />
        </div>
      </div>
      <div class="logo cf">
        <a href="/">
          <img src="@/assets/images/logo.png" class="rep-img" :alt="$t('companyName')">
        </a>
      </div>
    </div>
    <div class="nav-box">
      <div class="nav">
        <router-link to="/">{{ $t('routes.Home') }}</router-link>
        <router-link to="/exhibits/list">{{ $t('routes.Exhibits') }}</router-link>
        <router-link to="/live">{{ $t('routes.Live') }}</router-link>
        <router-link to="/about">{{ $t('routes.About') }}</router-link>
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
  }
}
</script>

<style lang="scss" scoped>
.header-box{
  .header{
    background: #000034;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
    .top-bar{
      margin-bottom: 5px;
    }
    .logo{
      display: block;
      width: 100%;
      height: auto;
      margin-right: 0.2rem;
    }
  }
  .nav-box{
    background: #e4e4e4;
    padding: 0 .2rem;
    overflow-x: scroll;
    .nav{
      height: 1rem;
      line-height: 1rem;
      font-size: .28rem;
      white-space:nowrap;
      a{
        display: inline-block;
        color: #333;
        font-weight: bold;
        padding: 0 .2rem;
      }
      .router-link-exact-active{
        color: #d70d19;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 40px;
          height: 2px;
          transform: translateX(-50%);
          background-color: #d70d19;
          transition: .2s all linear;
        }
      }
      .el-dropdown-link {
        font-size: .28rem;
        cursor: pointer;
        color: #333;
        font-weight: bold;
        padding: 0 .2rem;
      }
    }
  }
}
.subnav{
  .router-link-exact-active{
    color: #d70d19;
  }
}
</style>
