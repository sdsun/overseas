<template>
  <component :is="isMobile ? 'MobileBrand' : 'PcBrand'" />
</template>

<script>  
import PcBrand from './PcBrand'
import MobileBrand from './MobileBrand'

export default {
  components: {
    PcBrand,
    MobileBrand
  }
}
</script>