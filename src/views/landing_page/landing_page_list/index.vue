<template>
  <div class="lp-page">
    <div class="header">
      <div class="group-item" @click="handleGroupItem('')">
        <div class="name">
          <i class="iconfont icon-wenjianjia"></i>
          全部落地页
        </div>
      </div>
      <div class="group-item" @click="handleGroupItem(0)">
        <div class="name">
          <i class="iconfont icon-wenjianjia"></i>
          未分组
        </div>
      </div>
      <div class="group-item" v-for="(item,index) in group" :key="index" @click="handleGroupItem(item.eid)">
        <div class="name">
          <i class="iconfont icon-wenjianjia"></i>
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="table-container">
      <super-list :config="config" v-model="queryParams" @edit="handleEditLp" @data="handleData">
        <template slot="col-name" slot-scope="scope">
          <div>{{scope.row.name}}</div>
        </template>
        <template slot="col-group-name" slot-scope="scope">
          <div>{{scope.row.landingPageFolderName || '未分组'}}</div>
        </template>
        <template slot="col-fill-nums" slot-scope="scope">
          <div>{{scope.row.fillNums}}</div>
        </template>
        <template slot="col-preview" scope="scope">
            <a :href="'/preview.html?id='+scope.row.eid" class="button-preview" target="_Blank" v-if="scope.row && scope.row.content">预览</a>
          </template>
      </super-list>
    </div>
  </div>
</template>
<script>
import * as api from '../api.js'
import SuperList from '@/components/super_list'
export default {
  components: {
    SuperList
  },
  data() {
    return {
      group: [],
      queryParams: {},
      config: {
        restAPIUrl: `landing_pages`,
        keys: [
          {
            name: '落地页名称',
            innerSlot: 'col-name'
          },
          {
            name: '分组名称',
            innerSlot: 'col-group-name'
          },
          {
            name: '创建时间',
            type: 'date',
            key: 'createdAt',
            width: 80
          }, {
            name: '更新时间',
            key: 'updatedAt',
            type: 'date',
            width: 80
          },
          {
            name: '总填单数/今日填单数',
            innerSlot: 'col-fill-nums'
          },
          {
            name: '填单率',
            key: 'fr',
            sortable: false,
            width: 80,
            tooltip: true
          }, {
            name: '总访问数/今日访问数',
            key: 'pv',
            sortable: false,
            width: 120,
            tooltip: true
          }
        ],
        actionColWidth: 240,
        actionButtons: [
          {
            name: '编辑',
            eventKey: 'edit',
          }, {
            slot: 'col-preview'
          }, {
            name: "数据",
            eventKey: 'data',
          }, {
            name: "查看地址",
            eventKey: 'viewURL',
          }
        ]
      }
    }
  },  
  created() {
    api.getGroupAllList().then(res => {
      this.group = res
    })
  },
  methods: {
    handleGroupItem(eid) {
      if (eid === '') {
        // this.params = {
        //   searchValkue = ''
        // }
      }
    },
    handleEditLp(row) {
      this.$router.push({
        name: `page-builder`,
        params: { id: row.eid }
      });
    },
    handleData(row) {
      this.$router.push({
        name: "landing-page-data",
        params: { id: row.eid, name: row.name }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.lp-page {
  .header {
    text-align: left;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eaeef9;
    color: #999999;
    font-size: 12px;
    .group-item {
      display: inline-block;
      padding: 0px 20px;
      cursor: pointer;
      &:hover {
        color: #36af89;
      }
    }
  }
  .button-preview {
    float: left;
    background: #f4f8fd;
    padding: 0px 6px;
    border-radius: 3px;
    color: #6a7398;
    height: auto;
    border-color: #eaeef9;
    text-decoration: none;
    margin-left: 4px;
    font-size: 12px;
  } 
}
</style>

