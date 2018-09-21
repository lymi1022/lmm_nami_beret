<template>
  <div>
    <widget :is-edit="false" v-for="(widget, index) in pageState.widgets" :widget="widget" :key="index"></widget>
  </div>
</template>
<script>
import Widget from '../landing_page/partial/_widget'
export default {
  data() {
    return {
      pageState: {
        widgets: [],
        bgColor: '#fff',
      }
    }
  },
  mounted() {
    this.getPageState()
  },
  methods: {
     getPageState() {
      this.pageState = {
        ...this.pageState,
        ...JSON.parse(localStorage.getItem('previewData'))
      }
    },
  },
  components: {
    Widget
  }
}
</script>
