<style lang="scss" scoped>
.g-row {
  position: relative;
  box-sizing: border-box;
  &:after,
  &:before {
    display: table;
    content: "";
  }
  &:after {
    clear: both;
  }
}
</style>
<template>
  <div class="g-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
props: ['gutter'],
computed: {
  rowStyle() {
    return {
      marginLeft: -this.gutter/2 + 'px',
      marginRight: -this.gutter/2 + 'px'
    }
  }
}
}
</script>
