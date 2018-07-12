<template>
    <div class="page-builder">
      <div class="builder-header">
        <div class="left">{{pageName}}</div>
        <div class="right"><router-link class="blue-link" :to="{name: 'landing-page-management'}">返回落地页列表 &raquo;</router-link></div>
      </div>
      <div class="builder__wrap">
        <div class="left-side">
          <h2 class="builder--page__group-title">内容
            <i @click="handleSideMenuToggleClick(0)"></i>
          </h2>
          <widget-group :draggable="true" :widgets="contentWidgets"></widget-group>
        </div>
        <div class="builder__content">
          <builder-content></builder-content>
        </div>
        <div class="right-side">
          <right-side></right-side>
        </div>
        <div class="dynamic-fixed-position">
          <div class="footer">323</div>
        </div>
      </div>
    </div>
</template>
<script>
import * as api from '../api.js'
import { contentWidgets } from './page_widgets'
import WidgetGroup from '../partial/_widget_group'
import BuilderContent from '../partial/_builder_content'
import RightSide from '../partial/_right_side'
import parseJSON from '@/utils/parse_json'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      contentWidgets,
      pageInfo: {}
    }
  },
  components: {
    WidgetGroup,
    BuilderContent,
    RightSide,
  },
  created() {
    this.init()
  },
  computed: {
    pageName() {
      return this.pageInfo.name
    }
  },
  methods: {
    ...mapActions('landingPage', {
      updateBuilderContent: 'updateBuilderContent'
    }),
    init() {
      this.pageId = this.$route.params.id
      api.getLandingPage(this.pageId).then(data => {
        this.pageInfo = data.landingPage
        const widgets = (data.landingPage && parseJSON(data.landingPage.content || [])) || []
        this.updateBuilderContent(widgets)
      })
    },
    handleSideMenuToggleClick() {
      console.log(1);
    }
  }
}
</script>
<style lang="scss" scoped>
.page-builder {
    position: relative;
    height: 100%;
  .builder-header {
    border-bottom: 1px solid #EAEEF9;
    height: 45px;
    line-height: 45px;
    padding: 0 30px;
    overflow: hidden;
    text-align: left;
  }
  .builder__wrap {
    width: 100%;
    position: absolute;
    top: 45px;
    min-width: 1085px;
    bottom: 0;
    left: 0;
    .left-side {
      position: absolute;
      top: 0;
      bottom: 70px;
      left: 0;
      width: 355px;
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #eaeef9;
    }
    .builder__content {
      position: absolute;
      top: 23px;
      bottom: 70px;
      left: 50%;
      width: 500px;
      margin-left: -240px;
      border: 1px solid #ccc;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .right-side {
      width: 340px;
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      top: 0;
      bottom: 70px;
      right: 0;
      border-left: 1px solid #eaeef9;
    }
    .dynamic-fixed-position {
      position: fixed;
      top: auto;
      bottom: 0px;
      left: auto;
      right: 0px;
      z-index: 1;
      width: 100%;
      .footer {
        width: 100%;
        border-top: 1px solid #EAEEF9;
        text-align: center;
        background: #f7f7f7;
        padding: 0px;
        box-shadow: 0px 0px 10px #eaeaea;
        height: 70px;
        line-height: 70px;
      }
    }
  }
}
</style>

