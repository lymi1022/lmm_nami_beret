<template>
	<div class="widget--video">
    <div class="video-img" v-if="!widget.isLandingPage">
    </div>
    <div v-else>
      <div :id="['mod-layer-' + (widget.id || widget.uuid)]"></div>
    </div>
  </div>
</template>
<script>
import { getVideoId } from '../utils'

  export default {
    props: ['widget'],
    mounted() {
      if (this.widget.isLandingPage) {
        var video = new tvp.VideoInfo()
        video.setVid(getVideoId(this.widget.model.videoUrl))
        var player = new tvp.Player()
        player.create({
          width:480,
          height:360,
          video: video,
          modId: 'mod-layer-' + (this.widget.id || this.widget.uuid),
          autoplay: 0,
          playerType: 'html5'
        })
      }
    }
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

