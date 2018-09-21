<template>
  <el-table
    :data="rawRows"
    style="width: 100%"
    v-loading="isLoading"
    element-loading-text="数据加载中..."
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseLeave"
    >
    <template v-for="(prop, index) in keys">
       <el-table-column
        :label="prop.name"
        :key="index">
        <template slot-scope="scope">
          <template v-if="prop.innerSlot">
            <slot :name="prop.innerSlot" :row="scope.row"></slot>
          </template>
          <template v-else>
            {{scope.row[prop.key]}}
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column :width="configWithDefaults.actionColWidth" v-if="configWithDefaults.actionButtons.length !== 0">
        <template scope="scope">
          <template v-for="(btn, btnIndex) in configWithDefaults.actionButtons">
            <template v-if="btn.slot">
              <slot :name="btn.slot" :row="scope.row"></slot>
            </template>
            <template v-else>
              <el-button :key="btnIndex" class="el-button--cute" v-if="showBtn(scope.row, btn) && (!btn.type || btn.type !== 'del')" @click="handleActionBtnClick(scope.row, btn.eventKey)">{{btn.name}}</el-button>
              <el-button :key="btnIndex" class="el-button--cute" v-if="(btn.type && btn.type === 'del') && showBtn(scope.row, btn)" v-popover:popoverSms>{{btn.name || '删除'}}</el-button>
            </template>
          </template>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
import callApi from '@/helpers/call_api'
const defaultConfig = {
  fetchOnCreated: true,
  keys: [],
  actionButtons: [],
}

const defaultQueryParams = {
  pageNumber: 1,
  pageSize: 20,
  sort: 'updatedAt',
  order: 'desc'
}

export default {
  props: {
    config: {
      type: Object,
      required: true,
      default: config => defaultConfig,
      validator: config => {
        if (!config.restAPIUrl) {
          console.error('需要提供 config.restAPIUrl!')
          return false
        }
        return true
      }
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      rawRows: [],
      isLoading: false
    }
  },
  created() {
    if (this.configWithDefaults.fetchOnCreated) {
      this.refetch()
    }
  },
  watch: {
    queryParams(newV, oldV) {
      if (!_.isEqual(newV, oldV)) {
        this.refetch()
      }
    },
  },
  computed: {
    keys() {
      return this.configWithDefaults.keys
    },
    configWithDefaults() {
      return _.merge({}, defaultConfig, this.config)
    },
    queryParams: {
      get() {
        return {
          ...defaultQueryParams,
          sort: _.get(this.configWithDefaults, 'defaultSort.prop', defaultQueryParams.sort),
          ...(this.configWithDefaults.defaultPageSize && {
            pageSize: this.configWithDefaults.defaultPageSize
          }),
          ...this.value
        }
      },
      set(params) {
        this.$emit('input', params)
      }
    },
  },
  methods: {
    refetch(queryParams) {
      if (queryParams) {
        this.queryParams = queryParams
      }
      if (!queryParams || _.isEqual(queryParams, this.queryParams)) {
        this.fetchItems(this.queryParams).then(res => {
          let rows = res.rows || []
          this.rawRows = rows
          this.total = res.total || 0
          this.$nextTick(() => {
            this.$emit('refetched', rows, res)
          })
        })
      }
    },
    fetchItems(params) {
      this.isLoading = true
      return callApi(this.configWithDefaults.restAPIUrl, {
        method: 'get',
        params
      }).then(res => {
        this.isLoading = false
        return res
      })
    },
    handleActionBtnClick(row, eventKey) {
      this.$emit(eventKey, row)
    },
    showBtn(row, btn) {
      if (typeof btn.show === 'function') {
        return btn.show(row)
      }
      return true
    },
    handleMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    handleMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
