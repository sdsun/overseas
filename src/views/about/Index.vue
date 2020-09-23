<template>
  <component :is="isMobile ? 'MobileAbout' : 'PcAbout'" />
</template>

<script>  
import PcAbout from './PcAbout'
import MobileAbout from './MobileAbout'

export default {
  components: {
    PcAbout,
    MobileAbout
  }
}
</script>