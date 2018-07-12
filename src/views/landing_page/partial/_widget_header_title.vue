<template>
  <div :style="widgetWrapStyle">
      <div :style="widgetTitleStyle">{{widget.model.title || '标题'}}</div>
      <div :style="widgetSubTitleStyle">{{widget.model.subTitle || '副标题'}}</div>
  </div>
</template>
<script>
export default {
  props: ['widget'],
  computed: {
    model() {
      return this.widget.model
    },
    widgetWrapStyle() {
      return {
        padding: this.model.padding
      }
    },
    widgetTitleStyle() {
      return {
        fontSize: this.model.titleSize + 'px',
        color: this.model.titleColor,
      }
    },
    widgetSubTitleStyle() {
      return {
        fontSize: this.model.subTitleSize + 'px',
        color: this.model.subTitleColor,
      }
    }
  }
}
</script>
