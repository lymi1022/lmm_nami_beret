<template>
  <div class="startegy-home">
    <div class="header">
      策略列表
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.startegy-home {
  .header {
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 10px;
  }
}
</style>
