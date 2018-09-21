<template>
  <el-dialog class="create-edit-strategy" v-if="visible" title="新建策略" :visible="visible" @update:visible="$emit('update:visible', $event)" size="tiny">
    <div class="clearfix">
      <div class="header-name">
      策略名称
      <el-input class="create-input" size="small" v-model="inputNameVal"></el-input>
      </div>
      <div class="content">
        <div class="c-left">
          <div class="c-header">
            <span class="condition-setting">条件设置</span>
            <span class="c-tip">总共可设置5条规则</span>
          </div>
          <div class="strategys">
            <div class="s-header">
              <div class="left">任意满足</div>
              <span class="btn-opt right" @click="addStrategy('or')" v-if="strategyListMap.length<5">
                <i class="iconfont icon-add-2 icon-add"></i>新建策略
              </span>
            </div>
          <div class="rule-list">
            <div v-for="(item, index) in strategyListMap" :key="index" :class="strategyUuid === item.uuid && 'active'" @click="selectStrategy(item.uuid)" class="rule-item" v-if="item.type === 'or'">
                {{item.ruleName}}，{{item.section}}，{{item.stType === 0 ? item.value : `${item.strategyDate}:${item.strategyTime}`}}{{item.unit}}
                <i class="iconfont icon-del icon-shanchu" @click="handleRemoveStrategy(index)"></i>
                <div class="arrow-box"></div>
              </div>
          </div>
        </div>
        <div class="strategys">
            <div class="s-header">
              <div class="left">且同时满足</div>
              <span class="btn-opt right" @click="addStrategy('and')"  v-if="strategyListMap.length<5">
                <i class="iconfont icon-add-2 icon-add"></i>新建策略
              </span>
            </div>
          <div class="rule-list">
            <div v-for="(item, index) in strategyListMap" :key="index" :class="strategyUuid === item.uuid && 'active'" @click="selectStrategy(item.uuid)" class="rule-item" v-if="item.type === 'and'">
              {{item.ruleName}}，{{item.section}}，{{item.stType === 0 ? item.value : `${item.strategyDate}:${item.strategyTime}`}}{{item.unit}}
              <i class="iconfont icon-del icon-shanchu" @click="handleRemoveStrategy(index)"></i>
              <div class="arrow-box"></div>
            </div>
          </div>
        </div>
        </div>
        <div class="c-right">
          <div class="r-title">编辑规则</div>
        <div v-if="activeStrategyMap && strategyUuid">
            <el-select size="small" v-model="ruleId" style="width: 130px;">
              <el-option v-for="(item) in ruleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select size="small" v-model="symbol" style="width: 75px;">
              <el-option v-for="(item) in getEditStrategy(activeStrategyMap.stType)" :key="item.text + item.value" :label="item.text" :value="item.symbol"></el-option>
            </el-select>
            <template v-if="activeStrategyMap.stType === 0">
              <!--<verify-input :changeFn="changeValue" :verify="verifyNumber" @verify="verifyNumber" :value="activeStrategyMap.value" style="width: 95px;" id="verify_input"></verify-input>-->
              <lc-input style="width: 95px;" class="el-input--narrow" :value="strategyValue" :updateInputFn="changeValue"></lc-input>
              <label>{{activeStrategyMap.unit}}</label>
              <div class="tip" v-if="invalidMessage">
                {{invalidMessage}}
              </div>
            </template>
            <template v-else>
              <el-select size="small" v-model="strategyDate" style="width: 65px;">
                <el-option v-for="(item, index) in hours" :key="index" :label="item" :value="item"></el-option>
              </el-select>
              <el-select size="small" v-model="strategyTime" style="width: 65px;">
                <el-option v-for="(item, index) in minutes" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </template>
          </div>
        </div>
      </div>
    </div>
      <el-button type="primary btn-confirm" @click="handleSave" class="dialog-btn">确定</el-button>
  </el-dialog>
</template>
<script>
import uuid from '@/utils/guid'
import * as api from './api'
import LcInput from '@/components/lc_input.vue'
  export default {
    props: ['visible', 'strategyObj'],
    data() {
      return {
        inputNameVal: '',
        strategyUuid: null,
        strategyList: [],
        ruleList: [],
        sectionList: [],
        hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        minutes: ['00', 15, 30, 45],
      }
    },
    created() {
      api.getStrategyRuleList().then(res => {
        this.ruleList = res
      })
        this.sectionList = [
        {
          type: 0,
          list: [{text: '小于', symbol: '<'}, {text: '大于', symbol: '>'}, {text: '是', symbol: '='}],
        },
        {
          type: 1,
          list: [{text: '为', symbol: '='}],
        },
      ]

    },
    components: {
      LcInput
    },
    computed: {
      getRuleStatus() {
        return this.ruleList.find(item => {
          return item.id === this.ruleId
        }).status
      },
      // 只能输入自然数，最多输入9位数
      invalidMessage() {
        if (this.invalidNumberMax || this.NaNNumber) {
          return '只能输入自然数，最多输入9位数'
        } else if (this.invalidFloatNumber|| this.NaNNumber) {
          return '只能输入数字，精确到两位小数'
        } else if (this.invalidPercent || this.NaNNumber) {
          return '精确到两位小数，0.00 ~ 100区间'
        } else {
          return ''
        }
      },
      NaNNumber(){
        return isNaN(Number(this.activeStrategyMap.value))
      },
      invalidPercent() {
        let v = this.activeStrategyMap.value
        return this.getRuleStatus === 2 && v && ( v < 0 || v > 100 || (v.toString().split('.').length > 1 && v.toString().split('.')[1].length > 2))
      },
      invalidFloatNumber() {
        let v = this.activeStrategyMap.value
        return this.getRuleStatus === 1 && v && (v < 0 || (v.toString().split('.').length > 1 && v.toString().split('.')[1].length > 2))
      },
      invalidNumberMax() {
        let v = this.activeStrategyMap.value
        return this.getRuleStatus === 0 && v && (v < 0 || v > 999999999 || v.toString().includes('.'))
      },
      strategyDate: {
        get() {
          return this.activeStrategyMap.strategyDate
        },
        set(v) {
          this.strategyList = this.strategyList.map(item => {
            return item.uuid === this.strategyUuid ? {
              ...item,
              strategyDate: v
            } : item
          })
        }
      },
      strategyTime: {
        get() {
          return this.activeStrategyMap.strategyTime
        },
        set(v) {
          this.strategyList = this.strategyList.map(item => {
            return item.uuid === this.strategyUuid ? {
              ...item,
              strategyTime: v
            } : item
          })
        }
      },
      strategyValue: {
        get() {
          return this.activeStrategyMap.value
        },
        set(v) {
         this.strategyList = this.strategyList.map(item => {
            return item.uuid === this.strategyUuid ? {
              ...item,
              value: v
            } : item
          })
        }
      },
      ruleId: {
        get() {
          return this.activeStrategyMap.ruleId
        },
        set(v) {
          this.strategyList = this.strategyList.map(item => {
            return item.uuid === this.strategyUuid ? {
              ...item,
              ruleId: v
            } : item
          })
          let type = (_.find(this.ruleList, {
            id: v
          }) || {}).stType
          this.symbol = (_.find(this.sectionList, {
            type: type
          }) || {}).list[0].symbol

          let value =  (_.find(this.strategyListMap, {
            id: v
          }) || {}).value || ''
          this.strategyValue = value
        }
      },
      symbol: {
        get() {
          return this.activeStrategyMap.symbol
        },
        set(v) {
          this.strategyList = this.strategyList.map(item => {
            return item.uuid === this.strategyUuid ? {
              ...item,
              'symbol': v
            } : item
          })
        }
      },
      strategyListMap() {
        // const arr1 = this.strategyList.map(item => {
        //   return {
        //     ...item,
        //     'type': item.logic === 0 ? 'or' : 'and',
        //     // 获取ruleList中的'id', 'stType', 'unit', 'name'属性
        //     ...this.ruleList.map(item2 => {
        //       return _.pick(item2, ['id', 'stType', 'unit', 'name'])
        //       // 找到与id相匹配的属性
        //     }).find(item3 => {
        //       return item.ruleId === item3.id
        //     })
        //   }
        // })
        // // 把数组中的name改成ruleName
        // const arr2 = arr1.map(item => {
        //   return _.mapKeys(item, (val, key) => {
        //     return key === 'name' ? 'ruleName' : key
        //   })
        // }) 
        // // 去掉数组中的id
        // const arr3 = arr2.map(item => {
        //   return _.omit(item, ['id'])
        // })

        // // 与sectionList匹配，改成汉字
        // const arr4 = arr3.map(item => {
        //   const a4 = (_.find(this.sectionList, i => {
        //     return item.stType === i.type
        //   }) || {}).list
        //   return {
        //     ...item,
        //     'section': _.find(a4, f => {
        //     return item.symbol === f.symbol
        //   }).text
        //   }
        // })
        // return arr4
        return this.strategyList.map(item => {
          const arr2 = this.ruleList.map(item2 => {
            
            const pick = _.pick(item2, ['id', 'stType', 'unit', 'name'])

            const mapKey = _.mapKeys(pick, (val, key) => (key === 'name' ? 'ruleName' : key))

            const list = (_.find(this.sectionList, {
              type: mapKey.stType
            }) || {}).list

            return {
              ...mapKey,
              'section':( _.find(list, {
                symbol: item.symbol
              }) || {}).text
            }
          })
          return {
            ...item,
            'type': item.logic === 0 ? 'or' : 'and',
            ..._.find(arr2, {
              id: item.ruleId
            })
          }
        })
      },
      activeStrategyMap: {
        get() {
          return _.find(this.strategyListMap, {
            uuid: this.strategyUuid
          })
        } 
      },
    },
    methods: {
      handleSave() {
        const rules = this.strategyListMap.map(i => {
          const mapVal = _.mapValues(i, (val, key) => {
            if (i.stType) {
              if(key === 'value') {
                return `${i.strategyDate}:${i.strategyTime}`
              } else {
                return val
              }
            } else {
              return val
            }
          })
         const mapKey = _.mapKeys(mapVal, (val, key) => (key === 'value' ? 'value' : key))
          return _.pick(mapKey, ['logic', 'ruleId', 'symbol', 'value'])
        })
        let data = {
          action: 100,
          eid:'',
          ids: '',
          name: this.inputNameVal,
          rules: rules
        }
        api.getStrategyAdd(data)
      },
      addStrategy(type) {
        let item = {
          uuid: uuid(),
          value: '',
          ruleId: 100,
          symbol: '<',
          strategyDate: 1,
          strategyTime: '00',
          logic: type === 'or' ? 0 : 1
        }
        if (this.strategyList.length >=5) return
        this.strategyList = [...this.strategyList, item]
        this.selectStrategy(item.uuid)
      },
      selectStrategy(uuid) {
        this.strategyUuid = uuid
      },
      handleRemoveStrategy() {

      },
      getEditStrategy(type) {
        return (_.find(this.sectionList, {
          type: type
        }) || {}).list
      },
      changeValue(value) {
        if (!isNaN(Number(value)) && Number(value) <= 1000000000) {
          this.strategyValue = value
          return true
        }
        return false
      },
    }
  }
</script>
<style lang="scss">
.el-dialog__header {
  padding: 0;
  text-align: left;
  padding: 10px;
  .el-dialog__title {
    font-size: 14px;
  }
}
.el-dialog__body {
  padding: 0;
  margin: 0;
}
</style>

<style lang="scss" scoped>
.create-edit-strategy {
  .clearfix {
    clear: both;
    display: table;
    width: 100%;
  }
  height: 660px;
  .header-name {
    padding: 15px 30px;
    background-color: #F5F5F5;
    border-top: 1px solid #E2E8F8;
    border-bottom: 1px solid #E2E8F8;
    text-align: left;
  }
  .create-input {
    width: 200px;
  }
  .content {
    .c-left {
      width: 50%;
      height: 400px;
      float: left;
      border-right: 1px solid #eaeef9;
      text-align: left;
      .condition-setting {
        padding-left: 30px;
        font-size: 12px;
      }
      .c-tip {
        color: #b7b7b7;
        font-size: 12px;
        line-height: 1.5;
        padding-top: 8px;
      }
    }
    .c-header {
      height: 40px;
      line-height: 40px;
      text-align: left;
    }
    .strategys {
      .s-header {
        padding-left: 30px;
        background: #F3F5FB;
        border-top: 1px solid #E2E8F8;
        overflow: hidden;
        line-height: 32px;
        font-size: 12px;
        padding-right: 10px;
      }
    }
    .rule-list {
      min-height: 90px;
    }
    .c-right {
      text-align: left;
      float: left;
      .r-title {
        margin: 15px;
      }
    }
  }
  .rule-item {
    padding: 8px 20px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background-color: #f3faf8;
      .icon-del {
        display: inline-block;
      }
      .arrow-box {
        background: #FDFDFD;
        position: absolute;
        top: 0px;
        right: 15px;
        z-index: 9998;
        &:before, &:after {
          content: '';
          display: block;
          position: absolute;
          left: 100%;
          width: 0;
          height: 0;
          border-style: solid;
        }
        &:before {
          top: 8px;
          border-color: transparent #eaeef9 transparent transparent;
          border-width: 8px;
        }
        &:after {
          top: 8px;
          left: 2px;
          border-color: transparent white transparent transparent;
          border-width: 8px;
        }
      }
    }

    .icon-del {
      width: 14px;
      height: 14px;
      position: relative;
      top: 0px;
      font-size: 14px;
      display: none;
      float: right;
      cursor: pointer;
      color: blue;
    }
  }
  .btn-confirm {
    padding: 5px 10px;
  }
  .tip {
    color: #ff362f;
    text-align: right;
    margin-top: 6px;
    font-size: 12px;
  }
}

</style>
