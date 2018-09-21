<style lang="scss" scoped>
.panel-line {
  border-bottom: 1px solid #eaeef9;
  height: 55px;
  padding-left: 20px;
  line-height: 55px;
  text-align: left;
}
.panel-select {
  width: 120px;
  height: 25px;
  margin-right: 17px;
}
</style>
<style lang="scss">
.el-select--border {
  .el-input {
    line-height: 25px;
  }
  .el-input__inner {
    height: 25px;
    padding-right: 25px!important;
  }
  .el-input__inner:hover {
    border-color: #eaeef9;
  }
  .el-input__inner:focus {
    border-color: #eaeef9;
  }
}
.el-select--border.el-select:hover .el-input__inner {
  border-color: #eaeef9;
}
</style>
<template>
  <div>
    <div class="panel-line">
      <label>媒介：</label>
      <el-select class="el-select--border panel-select" v-model="medium">
        <el-option value="1"></el-option>
      </el-select>
      <label>广告位：</label>
      <el-select class="el-select--border panel-select" v-model="adSpace">
        <el-option value="1"></el-option>
      </el-select>
      <label>尺寸：</label>
      <el-select class="el-select--border panel-select" v-model="size">
        <el-option value="1"></el-option>
      </el-select>
      <label>主色调：</label>
      <main-color :value="selectedColors" @input="handleInput('selectedColors', $event)"></main-color>
    </div>
  </div>
</template>
<script>
import MainColor from './main_color'
import _ from 'lodash'
const QUERY_NAME_MAP = {
  platformId: '媒体',
  site: '广告位',
  size: '尺寸',
  selectedColors: '颜色',
  luminanceSD: '亮度标准差',
  saturation: '饱和度',
  lightness: '明度',
  brightness: '亮度',
  exposure: '曝光量',
  clicks: '点击量',
  clickRate: '点击率',
  ecpm: 'eCPM',
}
const COLOR_MAP = {
  0: '红色',
  1: '黄色',
  2: '绿色',
  3: '青色',
  4: '蓝色',
  5: '品红',
  6: '',
  7: '',
}
export default {
  components: {
    MainColor
  },
  data() {
    return {
      medium: '',
      adSpace: '',
      size: '',
      selectedColors: _.times(8),
      queryList: []
    }
  },
  computed: {
    queryInfo() {
      const a = this.queryList.map(type => {
        const value = this[type]
        console.log(value);
        const name = QUERY_NAME_MAP[type]
        let dispValue
        switch(type) {
          case 'selectedColors':
          dispValue = value.filter(i => COLOR_MAP[i]).map(i => COLOR_MAP[i]).join(', ')
          break
        }
        return {
          type,
          value: dispValue,
          name
        }
      })
      return a
    }
  },
  methods: {
    handleInput(key, v) {
      console.log(key);
      if (this.queryList.includes(key)) {
        this.queryList = this.queryList.filter(i => i !== key)
      } else {
        this.queryList.push(key)
      }
      this[key] = v
      // this.queryList.map(i => {
      //   if (key === "select-color") {
          
      //   }
      // })
      this.$emit('refetch-box', v)
    }
  }
}
</script>
