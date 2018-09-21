<template>
  <div class="strategy-library">
    <el-button @click="addStrategy" type="primary" class="btn-primary">新建策略</el-button>
    <super-list v-model="queryParams" :config="config"></super-list>
    <create-strategy :visible.sync="dialogCreateStrategy" :strategyObj="strategyObj" v-if="dialogCreateStrategy"></create-strategy>
  </div>
</template>
<script>
import SuperList from "@/components/super_list";
import createStrategy from '@/views/automate/strategy/create_edit_strategy'
export default {
  components: {
    SuperList,
    createStrategy
  },
  data() {
    return {
      queryParams: {},
      dialogCreateStrategy: false,
      strategyObj: null,
      config: {
        restAPIUrl: "strategy",
        tableClass: "el-table--row-higher",
        keys: [
          {
            name: "策略名称",
            key: "name",
            sortable: false,
            minWidth: 80
          },
          {
            name: '策略规则',
            key: "describe",
            sortable: false,
            minWidth: 80
          },
          {
            name: "执行操作",
            key: "actionName",
            sortable: false,
            minWidth: 80
          },
          {
            name: "创建时间",
            type: "date",
            key: "createdAt",
            sortable: false,
            minWidth: 80
          },
          {
            name: "被应用广告数",
            sortable: false,
            key: "adCount",
            minWidth: 90
          }
        ]
      }
    }
  },
  methods: {
    addStrategy() {
      this.dialogCreateStrategy = true
      this.strategyObj = null
    }
  }
};
</script>
<style lang="scss" scoped>
.strategy-library {
  .btn-primary {
    float: left;
    margin-left: 10px;
    height: 32px;
    line-height: 5px;
    padding: 5px 15px;
    font-size: 12px;
  }
}
</style>
