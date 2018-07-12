<template>
	<div class="widget--video">
    <div class="video-img">
    </div>
  </div>
</template>
<script>
  export default {
    props: ['widget']
  }
</script>
<style lang="scss" scoped>
.widget--video {
  .video-img {
    min-height: 100px;
    background: url(./images/w-video.png) no-repeat center;
  }
}
</style>

