<template>
 <div v-if="errors" class="err-msg">
    <i class="icon-error"></i>{{errorMsg}}
  </div>
</template>
<script>
  export default {
      props: ['errors', 'label'],
       computed: {
        errorMsg() {
          if (this.errors) {
            return `${this.label || ''}${this.errors.join(', ')}`
          }
          return ''
        }
      }
  }
</script>
<style lang="scss" scoped>
.err-msg {
    color: red;
    margin-top: 10px;
    position: absolute;
    bottom: 0;
    font-size: 12px;
}
.icon-error {
  background: url(./images/icon-s-error.png) no-repeat center;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  display: inline-block;
  &:before {
    display: none;
  }
}
</style>