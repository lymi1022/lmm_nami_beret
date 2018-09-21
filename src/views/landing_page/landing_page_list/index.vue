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
      <super-list 
          ref="splist"
          :config="config" 
          v-model="queryParams" 
          @edit="handleEditLp" 
          @data="handleData"
          @cell-mouse-enter="handleMouseEnter"
          @refetched="refetched"
          @cell-mouse-leave="handleMouseLeave">
        <template slot="col-name" slot-scope="scope">
          <!-- <div v-if="!edit[scope.row.eid]">{{scope.row.name}}
            <span v-if="currentId === scope.row.eid" @click="handleEditIcon(scope.row)">
              <i class="iconfont icon-edit"></i>
            </span>
          </div>
          <div v-else>
            <el-row>
              <el-col :span="18">
                <el-input v-model="inputEditVal"></el-input>
              </el-col>
              <el-col :span="6">
                <span class="icon icon-a" @click="handleConfirm(scope.row)">
                  <i class="el-icon-circle-check"></i>
                </span>
                <span class="icon icon-b" @click="handleCancel(scope.row)">
                  <i class="el-icon-circle-close"></i>
                </span>
              </el-col>
            </el-row>
          </div> -->
          <div class="line-edit">
            <editable-input
            :value="scope.row.name"
            :width="lineWidth"
            @input="handleInput(scope.row, $event)"
            @update:editing="handleEditIconClick(scope.row, $event)"
            :isEditing="editingGroupId === scope.row.eid"
            :showEditIcon="currentId === scope.row.eid"
          ></editable-input>
          </div>
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
import submitWithVersionCheck from '@/helpers/submit_with_version_check'
import { observeDom } from '@/helpers/mutation_observer'
import EditableInput from '@/components/editable_input'
import $ from 'jquery'
export default {
  components: {
    SuperList,
    EditableInput
  },
  data() {
    return {
      group: [],
      inputEditVal: '',
      edit: {},
      lpList: [],
      currentId: -1,
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
      },
      observeTarget: {},
      editingGroupId: null,
      lineWidth: null,
    }
  },
  created() {
    api.getGroupAllList().then(res => {
      this.group = res
    })
  },
  mounted() {
    this.observeTarget = this.$refs.splist.$el
    this.initObserver()
    window.addEventListener('resize', this.updateLineWidth)
  },
  destroyed () {
    window.removeEventListener('resize', this.updateLineWidth)
  },
  methods: {
    handleEditIconClick(row, v) {
      if (v) {
        this.editingGroupId = row.eid
      } else {
        this.editingGroupId = null
      }
    },
    handleInput(row, v) {
      let data = {
        name: v,
        version: row.version,
      }
      api.lpRename(row.eid, data, false).then(res => {
        this.editingGroupId = null
        this.$refs.splist.refetch()
      })
    },
    initObserver() {
      if (this.observer) {
        this.observer.disconnect()
      }
      const observer = observeDom(this.observeTarget, () => {
        this.updateLineWidth()
      })
      this.observer = observer
    },
    updateLineWidth() {
      this.lineWidth = this.lpList.length > 0 && $('.line-edit')[0].clientWidth
    },
    handleGroupItem(eid) {
      if (eid === '') {
        // this.params = {
        //   searchValkue = ''
        // }
      }
    },
    editInit() {
      this.edit = _.reduce(this.lpList, (obj, row) => {
        return {
          ...obj,
          [row.eid]: false
        }
      })
    },
    refetched(rows) {
      this.lpList = rows
      this.editInit()
    },
    handleEditIcon(row) {
      this.editInit()
      this.edit[row.eid] = true
      this.inputEditVal = row.name
    },
    handleConfirm(row) {
      const fn = () => {
        let data = {
          name: this.inputEditVal,
          version: row.version,
        }
        return api.lpRename(row.eid, data, false)
      }
      const updateVersionNumber = version => { row.version = version }
      submitWithVersionCheck(this, fn, updateVersionNumber, '重命名成功')
        .then(() => {
          this.$refs.splist.refetch()
        })
        .catch(() => {})
    },
    handleCancel(row) {
      this.edit[row.eid] = false
    },
    handleMouseEnter(row, column, cell, event) {
      this.currentId = row.eid
    },
    handleMouseLeave(row, column, cell, event) {
      this.currentId = -1
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
  .icon-a {
    color: blue;
  }
  .icon-b {
    color: #C1C1C1;
  }
}
</style>

