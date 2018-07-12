<template>
  <div class="widget-group">
    <draggable class="builder__draggable-content full-height" @change="handleChange" v-model="pageContent" :options="{group: 'components'}">
      <div @click="handleItemClick(widget.id)" :class="['widget-item', active === widget.id && 'widget-item--active']" :id="'widget-item-' + widget.id "  v-for="(widget, index) in pageContent" :key="index">
          <widget :widget="widget"></widget>
        </div>
    </draggable>
    <!-- <draggable class="builder__draggable-content full-height" v-model="list1"  @change="handleChange1" :options="{group: 'people'}">
      <div class="widget-item" :id="'widget-item-' + widget.id "  v-for="(widget, index) in list1" :key="index">
          <div class="widget-label">{{widget.name}}</div>
        </div>
    </draggable> -->
  </div>
</template>
<script>
import draggable from "vuedraggable"
import * as api from "../api.js"
import Widget from './_widget'
import { mapActions, mapState } from 'vuex'
const list1 = [
  {
    id: 1,
    name: "a1"
  },
  {
    id: 2,
    name: "b1"
  },
  {
    id: 3,
    name: "c1"
  },
  {
    id: 4,
    name: "d1"
  },
  {
    id: 5,
    name: "1e"
  },
  {
    id: 6,
    name: "f1"
  }
];
export default {
  data() {
    return {
      list1
    };
  },
  computed: {
    ...mapState('landingPage', {
      widgets: 'widgets',
      active: 'activeWidgetId'
    }),
    pageContent: {
      get() {
        return this.widgets
      },
      set(widgets) {
        this.updateBuilderContent(widgets)
      }
    }
  },
  components: {
    draggable,
    Widget
  },
  methods: {
    ...mapActions('landingPage', {
      addWidget: 'addWidget',
      setActiveWidget: 'setActiveWidget',
      updateBuilderContent: 'updateBuilderContent'
    }),
    handleItemClick(id) {
      this.setActiveWidget({id})
    },
    handleChange1(e) {
      if (e.added) {
        console.log(e.added.element);
      }
      if (e.moved) {
        console.log(e.moved.element);
        // this.setActiveWidget(e.moved.element.id)
      }
    },
    handleChange(e) {
      if (e.added) {
        this.addWidget({
          factory: e.added.element.widget,
          index: e.added.newIndex
        })
      }
      if (e.moved) {
        // this.setActiveWidget(e.moved.element.id)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.widget-group {
  &__widget {
    width: 75px;
    height: 65px;
    float: left;
    background-color: #f2f5fb;
    text-align: center;
    margin: 1px;
    color: #666;
    cursor: pointer;
  }
  .widget-icon {
    display: block;
    margin: 6px auto 3px;
    font-size: 32px;
    color: #36af89;
  }
  .widget-item:hover {
    border: 1px solid #6a7299;
  }
  .widget-item--active {
    border: 1px solid #6a7299;
        box-sizing: border-box;
  }
}
</style>
