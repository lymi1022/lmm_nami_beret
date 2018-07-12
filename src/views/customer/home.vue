<template>
  <el-col :span="24" class="main" id="customer-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-col>
</template>

<style lang="scss">

</style>
