<template>
  <div id="app" class="app">
    <router-view/>
    <el-backtop target=".app" :bottom="80" :right="20"></el-backtop>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
  color: #333;
  overflow: scroll;
}
</style>
