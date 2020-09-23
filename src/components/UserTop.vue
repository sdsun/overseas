<template>
    <div class="user-top cf">
      <div class="back fl">
        <router-link :to="{ name: 'Home' }" title="haier overseas experience platform">
          <img src="@/assets/images/user_logo.png" width="100" height="30">
        </router-link>
      </div>
      <div class="language fr">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color: #FFF; cursor: pointer;">
            <i class="iconfont icon-lang"></i>
            {{ $t('lang') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    // 语言切换
    handleCommand(command) {
      this.changeLang(command)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-top{
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding:15px;
  z-index: 999;
  left: 0;
  top: 0;
  .back{
      a{
      transition: transform .5s ease;
      display: block;
      color: #9eb9d2;
      &:hover{
          transform: translateX(-5px);
          color: #FFF;
      }
      }
  }
}
// 适配移动端
@media (max-width: 1199px) {
  .user-top{
    .back{
      img{
        width: 80px;
        height: 24px;
      }
    }
  }
}
</style>
