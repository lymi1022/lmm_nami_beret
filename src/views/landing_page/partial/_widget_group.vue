<template>
  <div class="widget-group">
    
    <draggable v-model="widgets" :options="{group:{ name:'components',  pull:'clone', put:false },sort:false}">
        <div class="widget-group__widget" v-for="(w, index) in widgets" :key="index" @click="selectWidget(w)" >
          <span :class="'widget-icon iconfont icon-' + w.widget.icon"></span>
          <span>{{w.widget.displayName}}</span>
        </div>
    </draggable>
    <!-- <draggable v-model="list" :options="{group:{ name:'people',  pull:'clone', put:false },sort:false}">
        <div class="widget-group__widget" v-for="(w, index) in list" :key="index" >
          <span>{{w.name}}</span>
        </div>
    </draggable> -->
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import * as api from '../api.js'
import { mapActions } from 'vuex'
const list = [
        {
          id: 1,
          name: 'a'
        },
        {
          id: 2,
          name: 'b'
        },
        {
          id: 3,
          name: 'c'
        },
        {
          id: 4,
          name: 'd'
        },
        {
          id: 5,
          name: 'e'
        },
        {
          id: 6,
          name: 'f'
        },
      ]
      
export default {
  props: ['widgets', 'draggable'],
  data() {
    return {
      list,
    }
  },
  components: {
    draggable
  },
  methods: {
    ...mapActions('landingPage', {
      addWidget: 'addWidget',
      scrollTopWidget: 'scrollTopWidget'
    }),
    selectWidget(w) {
      this.addWidget({
        factory: w.widget
      })
      setTimeout(() => {
        this.scrollTopWidget()
      }, 0)
    }
  }
}
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
}
</style>
