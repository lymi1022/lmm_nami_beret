<template>
    <div>
      <div v-for="(field, key) in fields" :key="key">
        <div v-if="field.type === 'input'">
          <label>{{field.label}}</label>
          <el-input :value="widgetModel[key]" @input="updateWidget($event, key)"></el-input>
          <field-errors :label="field.label" :errors="widget.errors[key]"></field-errors>
        </div>
        <div v-else-if="field.type === 'slide'">
          <label>{{field.label}}</label>
          <el-slider
            :value="widgetModel[key]"
            @input="updateWidget($event, key)"
            show-input>
          </el-slider>
        </div>
        <div v-else-if="field.type === 'make-options'">
          <label class="label">{{field.label}}</label>
          <field-make-options :value="widgetModel[key]" :max="field.max" :min="field.min" @input="updateFieldModel($event, key)" :enableChecked="field.enableChecked"></field-make-options>
        </div>
        <div v-else-if="field.type === 'radio'">
          <label>{{field.label}}</label>
          <div>
             <el-radio
              :class="field.style === 'flat' ? 'el-radio--green-border': ''"
              class="el-radio--darker"
              v-for="(radio, index) in field.options"
              :key="index"
              :value="widgetModel[key]"
              :label="radio.value"
              @input="updateWidget($event, key)"
            >
          <span v-if="radio.template" v-html="radio.template"></span>
          <span v-else>{{radio.name}}</span>
          </el-radio>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Slide from './_slide'
import { mapActions } from 'vuex'
import FieldErrors from './_field_errors'
import FieldMakeOptions from './_field_make_options'

export default {
  props: ['type', 'widget'],
  data() {
    return {
      inputVal: ''
    }
  },
  components: {
    Slide,
    FieldErrors,
    FieldMakeOptions
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
