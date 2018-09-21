<template>
  <div class="widget--head-title" :style="widgetWrapStyle">
      <h1 class="title" :style="widgetTitleStyle">{{widget.model.title || '标题'}}</H1>
      <div class="sub-title" :style="widgetSubTitleStyle">{{widget.model.subTitle || '副标题'}}</div>
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
<style lang="scss" scoped>
.widget--head-title {
  padding: 2rem 1.33rem;
  text-align: center;
  .title {
    font-weight: normal;
    font-size: 2.33rem;
    margin: 0;
    margin-bottom: 0.667rem;
  }
  .sub-title {
    color: #666;
    font-size: 1.1rem;
  }
}
</style>
