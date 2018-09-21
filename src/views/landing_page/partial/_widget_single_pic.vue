<style scoped>
/* .g-row */
</style>

<template>
  <g-row :gutter="10">
    <g-col :span="24/widget.model.layoutCols" v-for="(item, idx) in options" :key="idx">
      <label>
        <input type="radio" />{{item.value}}
      </label>
    </g-col>
  </g-row>
</template>
<script>
import GRow from '@/components/g_row'
import GCol from '@/components/g_col'
export default {
  props: ['widget'],
  computed: {
    options() {
      return this.widget.model.options
    }
  },
  components: {
    GRow,
    GCol,
  }
}
</script>