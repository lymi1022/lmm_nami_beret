<style lang="scss" scoped>
.edit-val {
  font-size: 14px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<template>
  <div class="editable-input" :style="{width: width + 'px'}">
    <template v-if="!isEditing">
      <el-tooltip class="item" effect="dark" :disabled="!showTooltips" :content="value" placement="top">
        <span ref="editVal" class="edit-val" :style="displayTitleStyle">{{value}}</span>
      </el-tooltip>
      <span class="icon icon-edit-wrap" v-if="showEditIcon"  @click="handleEditClick()">
        <i class="iconfont icon-edit"></i>
      </span>
    </template>
    <template v-else>
      <el-row>
        <el-col :span="14">
          <el-input v-model="inputEditVal"></el-input>
        </el-col>
        <el-col :span="10">
          <div class="edit-btns-wrap">
            <span class="icon icon-a" @click="handleConfirm">
              <i class="el-icon-circle-check"></i>
            </span>
            <span class="icon icon-b" @click="handleCancel">
              X
            </span>
          </div>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
import $ from 'jquery'
  export default {
    props: ['value', 'showEditIcon', 'isEditing', 'width'],
    data() {
      return {
        inputEditVal: '',
        textWidth: null
      }
    },
    mounted() {
      this.calculateWidth()
      window.addEventListener('resize', this.resize())
    },
    destroyed() {
      window.removeEventListener('resize', this.resize())
    },
    computed: {
      showTooltips() {
        return this.width - 50 <= this.textWidth
      },
      // width() {
      //   return this.width ? this.width : 200
      // }
      displayTitleStyle() {
        return {
          maxWidth: this.width - 50 + 'px'
        }
      }
    },
    watch: {
      value(v) {
        this.$nextTick(() => {
          this.calculateWidth()
        })
      }
    },
    methods: {
      resize() {
        this.calculateWidth()
      },
      calculateWidth() {
        this.textWidth = this.$refs.editVal.clientWidth
      },
      handleConfirm() {
        this.$emit('input', this.inputEditVal)
      },
      handleCancel() {
        this.$emit('update:editing', false)
        // this.inputEditVal = this.value
      },
      handleEditClick() {
        this.inputEditVal = this.value
        this.$emit('update:editing', this.value)
      }
    }
  }
</script>
