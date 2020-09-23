<template>
  <div class="brands">
    <h2 class="common-title">{{ $t('allBrands') }}</h2>
    <el-row type="flex" :gutter="30">
      <el-col :span="6" class="item" v-for="(item, index) in list" :key="index">
        <router-link target="_blank" :to="{ name: 'Brand', params: { id: item.id }}">
          <div class="item-img">
            <img :src="item.fileUrl" class="rep-img">
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Brands',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.brands{
  .item{
    max-width: 25%;
    .item-img{
      background: #19286d;
    }
  }
}
</style>
