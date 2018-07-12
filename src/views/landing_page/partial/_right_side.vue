<template>
  <div>
    <el-tabs type="border-card" v-if="hasContentSettings">
      <el-tab-pane label="组件内容">
        <fields type="content" :widget="activeWidget"></fields>
      </el-tab-pane>
      <el-tab-pane label="组件样式" v-if="hasStyleSettings">
        <fields type="style" :widget="activeWidget"></fields>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Fields from './fields'

export default {
  computed: {
    ...mapGetters('landingPage', {
      activeWidget: 'activeWidget'
    }),
    hasContentSettings() {
      if (!this.activeWidget) {
        return false
      }
      return _.some(this.activeWidget.fields, i => i.group === 'content')
    },
    hasStyleSettings() {
      if (!this.activeWidget) {
        return false
      }
      return _.some(this.activeWidget.fields, i => i.group === 'style')
    }
  },
  components: {
    Fields
  }
}
</script>
