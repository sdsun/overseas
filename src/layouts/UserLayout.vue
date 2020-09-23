<template>
  <div class="user-box">
    <user-top />
    <img class="user-left-img" src="https://cdnoverseas.haier.net/sys/caa284b4ca6f41ac9f2b134fb74b2efa.png">
    <div class="user-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import UserTop from '@/components/UserTop'

export default {
  components: {
    UserTop
  }
}
</script>
<style lang="scss">
.user-box{
  position: relative;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #2561e5;
  background-image: linear-gradient(to right, #0ea7ea,#2b5ae6);
  display: flex;
  align-items: center;
  &:after{
  content:'';
  min-height:inherit;
  font-size:0;
  }
  .user-left-img{
    display: block;
    position: absolute;
    width: 50%;
    height: auto;
    bottom: 0;
    left: 0;
  }
  .user-main{
    background: #FFF;
    box-sizing: border-box;
    padding: 30px 30px 5px 30px;
    margin-top: 60px;
    margin-bottom: 20px;
    margin-left: 60%;
    width: 30%;
    max-width: 420px;
    .user-btn{
      text-align: center;
      margin-bottom: 20px;
      a{
        padding: 0 30px;
        color: #333;
        font-size: 18px;
        font-weight: bold;
        &.router-link-exact-active{
          color: #2561e5;
        }
      }
    }
  }
}
// 适配移动端
@media (max-width: 1199px) {
  .user-box{
    .user-left-img{
      display: none;
    }
    .user-main{
      width: 90%;
      margin: 60px auto 20px auto;
      .user-btn{
        a{
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.user-box{
  .el-input__inner{
    background: #e8eff7;
  }
  .user-submit-btn{
    width: 100%;
    background-image: linear-gradient(to right, #0ea7ea,#2b5ae6);
  }
}
</style>
