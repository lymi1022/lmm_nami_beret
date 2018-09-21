<template>
  <div class="page-widget">
    <div class="widget widget--text" v-if="widget.name === 'Text'">
      <div v-if="widget.model.content" v-html="widget.model.content"></div>
      <div v-else>默认文字</div>
    </div>
    <widget-header-title class="widget" v-else-if="widget.name === 'Title'" :widget="widget"></widget-header-title>
    <widget-video class="widget" v-else-if="widget.name === 'Video'" :widget="widget"></widget-video>
    <widget-form class="widget" v-else-if="widget.name === 'Form'" :widget="widget"></widget-form>
    <widget-single-pic class="widget" v-else-if="widget.name === 'SinglePic'" :widget="widget"></widget-single-pic>
  </div>
</template>
<script>
import WidgetHeaderTitle from './_widget_header_title'
import WidgetVideo from './_widget_video'
import WidgetForm from './_widget_form'
import WidgetSinglePic from './_widget_single_pic'
export default {
  props: ['widget'],
  components: {
    WidgetHeaderTitle,
    WidgetVideo,
    WidgetForm,
    WidgetSinglePic,
  }
}
</script>
<style lang="scss" scoped>
.page-widget {
  .widget {
    padding: 0.3rem 1rem;
    font-size: 1rem;
  }
}
</style>

