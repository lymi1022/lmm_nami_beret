<style lang="scss" scoped>
.main-color {
  display: inline-block;
  .all-color {
    border: 1px solid black;
    border-radius: 23px;
    padding: 0px 7px;
    font-size: 14px;
    color: #6a7398;
  }
  .all-color-active {
    background:#6a7398;
    color: #fff;
  }
  .round {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    position: relative;
    top: 4px;
  }
  .icon-check {
    position: absolute;
    top: 0px;
    color: #fff;
    font-weight: bold;
    font-size: 19px;
    i {
      position: absolute;
    }
  }
}
</style>

<template>
  <div class="main-color">
    <span @click="allClick" :class="['all-color', allSelected ? 'all-color-active': '']">全部</span>
    <span class="round"
      @click="handleClick(color.value)"
      v-for="(color, idx) in colors"
      v-if="idx < 6"
      :key="color.value"
      :style="{background: color.hex}"
    >
      <span class="icon-check" v-if="selected.includes(color.value) && !allSelected">
        <i class="el-icon-check" ></i>
      </span>
    </span>
  </div>
</template>
<script>
import _ from 'lodash'
const COLORS = {
  0: '#DC2C21',
  1: '#E3E313',
  2: '#1DB418',
  3: '#27CACB',
  4: '#2C31BA',
  5: '#C615C8',
  6: '#FFFFFF',
  7: '#000000',
}
const COLORS_ORDER = [0, 1, 2, 3, 4, 5, 6, 7]
export default {
  props: ['value'],
  data() {
    return {
      // colorsValue: [],
      all: false
    }
  },
  computed: {
    colors() {
      return COLORS_ORDER.map(v => {
        return {
          hex: COLORS[v],
          value: v,
        }
      })
    },
    selected: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    allSelected() {
      return _.union(this.value).length === COLORS_ORDER.length
    }
  },
  methods: {
    handleClick(v) {
      if (this.allSelected) {
        this.selected = [v]
      } else if (this.selected.includes(v)) {
        const target = this.selected.filter(k => k !== v)
        if (target.length === 0) {
          this.allClick()
        } else {
          this.selected = target
        }
      } else {
        this.selected.push(v)
      }
    }, 
    allClick() {
      this.selected = _.times(COLORS_ORDER.length)
    }
  }
}
</script>
