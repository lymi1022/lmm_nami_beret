<style scoped>
.col {
  float: left;
}
</style>

<template>
  <div class="col" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
props: ['span'],
  computed: {
    colStyle() {
      return {
        width: this.span / 24 * 100 + '%'
      }
    }
  }
}
</script>