<template>
</template>

<script>
import { postLiveplatform } from '@/api/user'

export default {
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    var data = {
      visitorId: this.$route.query.visitorId,
      actId: this.$route.query.actId
    }
    postLiveplatform(data).then((res) => {
      if (res.code === 200) {
        window.location.href = res.data
        loading.close()
      }
    })
  }
}
</script>
