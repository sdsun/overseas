<template>
<div>
  <div class="top-tool">
    <template v-if="token">
      <el-dropdown trigger="click" style="margin-right: 15px">
        <span class="el-dropdown-link">
          {{ nickname }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="subnav">
          <el-dropdown-item @click.native="handleLogout">
            {{ $t('logout') }}
          </el-dropdown-item>
          <el-dropdown-item @click.native="$refs.cancellationForm.show()">
            {{ $t('cancelAccount') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template v-else>
      <router-link class="user-link" :to="{ name: 'Login' }">{{ $t('login') }}</router-link>
      <router-link class="user-link" :to="{ name: 'Register' }">{{ $t('register') }}</router-link>
    </template>
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
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
  <!-- 销户 -->
  <cancellation-form ref="cancellationForm"/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CancellationForm from '@/components/CancellationForm'

export default {
  components: {
    CancellationForm
  },
  computed: {
    ...mapGetters(['token', 'nickname'])
  },
  methods: {
    // 退出登陆
    handleLogout () {
      this.$store.dispatch('Logout').then(()=>{
        window.location.reload()
      })
    },
    // 语言切换
    handleCommand(command) {
      this.changeLang(command)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tool{
  width: 100%;
  height: 40px;
  line-height: 40px;
  .inner{
    width: 1200px;
    margin: 0 auto;
  }
  .el-dropdown-link {
    display: block;
    cursor: pointer;
    color: #FFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .user-link{
    padding:0 10px;
    color: #FFF;
  }
}
</style>