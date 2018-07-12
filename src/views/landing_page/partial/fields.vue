<template>
    <div>
      <div v-for="(f, key) in fields" :key="key">
        <div v-if="f.type === 'input'">
          <label>{{f.label}}</label>
          <el-input :value="widgetModel[key]" @input="updateWidget($event, key)"></el-input>
        </div>
        <div v-else-if="f.type === 'slide'">
          <label>{{f.label}}</label>
          <el-slider
            :value="widgetModel[key]"
            @input="updateWidget($event, key)"
            show-input>
          </el-slider>
        </div>
      </div>
    </div>
</template>
<script>
import Slide from './_slide'
import { mapActions } from 'vuex'
export default {
  props: ['type', 'widget'],
  data() {
    return {
      inputVal: ''
    }
  },
  components: {
    Slide
  },
  methods: {
    ...mapActions('landingPage', {
      updatWidget: 'updatWidget'
    }),
    updateWidget(ev, key) {
      this.updatWidget({
        id: this.widget.id,
        model: {
          [key]: ev
        }
      })
    }
  },
  computed: {
    fields() {
      return _.omitBy(this.widget.fields, i => {
        return this.type !== i.group
      })
    },
    widgetModel() {
      return this.widget.model
    },
  },
}
</script>
