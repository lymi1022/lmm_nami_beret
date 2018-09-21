<template>
  <el-input ref="lcinput" :placeholder="placeholder" size="small" @keyup.enter.native="enter" :value="value" @input="updateVal" @change="change" @blur="handleBlur"></el-input>
</template>

<script>
export default {
  props: ['placeholder', 'value', 'autofocus', 'updateInputFn'],
  mounted() {
    if (this.autofocus || this.autofocus === '') {
      this.$refs.lcinput.$refs.input.focus()
    }
  },
  methods: {
    enter() {
      this.$emit('enter', this.value)
    },
    updateVal(v) {
      const oldV = this.value
      if (this.updateInputFn) {
        if (this.updateInputFn(v)) {
          this.$refs.lcinput.$refs.input.value = v
        } else {
          setTimeout(() => {
            this.$refs.lcinput.$refs.input.value = oldV
          }, 0)
        }
      } else {
        this.$emit('input', v)
      }
    },
    change(v) {
      this.$emit('change', v)
    },
    handleBlur(v) {
      this.$emit('blur', v)
    }
  }
}
</script>
