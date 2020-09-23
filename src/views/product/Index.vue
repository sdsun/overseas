<template>
  <component :is="isMobile ? 'MobileProduct' : 'PcProduct'" />
</template>

<script>  
import PcProduct from './PcProduct'
import MobileProduct from './MobileProduct'

export default {
  components: {
    PcProduct,
    MobileProduct
  }
}
</script>