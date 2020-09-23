<template>
  <div class="page">
    <component :is="isMobile ? 'MobileLive' : 'PcLive'" />
  </div>
</template>

<script>  
import PcLive from './PcLive'
import MobileLive from './MobileLive'

export default {
  components: {
    PcLive,
    MobileLive
  }
}
</script>