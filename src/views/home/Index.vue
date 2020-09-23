<template>
  <component :is="isMobile ? 'MobileHome' : 'PcHome'" />
</template>

<script>  
import PcHome from './PcHome'
import MobileHome from './MobileHome'

export default {
  components: {
    PcHome,
    MobileHome
  }
}
</script>