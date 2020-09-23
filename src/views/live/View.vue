<template>
  <div class="view-box" v-if="visible">
    <i class="close el-icon-close" @click="visible = false"></i>
    <object style="border: 0px" type="text/x-scriptlet" :data="url" width="100%" height="100%"></object>
    <!-- <iframe
      :src="url"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="auto">
    </iframe> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      url: ''
    }
  },
  watch: {
    visible(v) {
      console.log(v)
      if (v) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    }
  },
  methods: {
    show(url) {
      this.visible = true
      this.url = url
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    }
  },
  beforeDestroy(){
    document.body.style.overflow = 'visible'
  }
}
</script>

<style lang="scss" scoped>
.view-box{
  position: fixed;
  background: #FFF;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99;
  .close{
    position: absolute;
    font-size: 24px;
    right: 40px;
    top: 20px;
    color: #FFF;
    z-index: 9999;
    background: #000034;
  }
}
</style>
