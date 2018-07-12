<template>
  <div class="block">
    <label>{{field.label}}</label>
    <el-slider
      v-model="valueSlide"
      show-input>
    </el-slider>
  </div>
</template>

<script>
export default {
  props: ['field'],
  data() {
    return {
      valueSlide: 0
    };
  }
};
</script>