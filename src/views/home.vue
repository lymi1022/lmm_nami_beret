<style scoped lang="scss">
.home-page {
  .left-side {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    &__children {
      position: fixed;
      left: 100px;
      top: 0px;
      height: 100%;
      width: 110px;
      z-index: 2;
      ul.el-menu {
        height: 100%;
      }
      .submenu-sep {
        border-top: 1px solid #eaeaea;
        display: block;
        margin: 15px 7px;
      }
    }
    ul.el-menu-vertical-demo {
      height: 100%;
    }
  }
  .right-content {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    min-width: 1000px;
  }
}
</style>

<template>
  <div class="home-page">
    <div class="left-side" ref="leftSide">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="(item, index) in menuGroup1" :index="item.uuid" :key="index" @click="handleMenuClick(item)">
          <i :class="['iconfont', item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="left-side__children" v-if="hasSubMenus" ref="leftSideChildren">
      <el-menu
        default-active="2"
        v-if="subMenus.length > 0"
        active-text-color="#ffd04b">
        <template v-for="(item, index) in subMenus">
          <span v-if="item.type && item.type === 'sep'" :key="index" class="submenu-sep"></span>
          <el-menu-item v-else :index="item.uuid" :key="index" @click="handleMenuClick(item)">
            <i :class="['iconfont', item.icon]"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="right-content" :style="{paddingLeft: menuWidth + 'px'}"></router-view>
    </transition>
  </div>
</template>
<script>
import uuid from '@/utils/guid'
import hasPermission from '@/helpers/has_permission'
const PERMISSION_MAP = {
  'child-account': ['sub-member-page', 'sub-group-page'],
  'recharge-record': 'system-financial-list',
  'webhook': 'webhook-management',
  'api': 'api-management',
  'domain-binding': 'whitelist-domain'
}
const guardArray = input => {
  return Array.isArray(input) ? input : [input]
}
const addUuid = menus => menus.map(menu => {
  const _uuid = uuid()
  if (menu.children) {
    return {
      uuid: _uuid,
      ...menu,
      children: addUuid(menu.children)
    }
  }
  return {
    uuid: _uuid,
    ...menu,
  }
})

const menuGroup1 = addUuid([
  {
    name: '概况',
    routeName: 'overview',
    icon: 'icon-gaikuang',
  },
  {
    name: '落地页',
    icon: 'icon-yemian',
    children: [
      {
        name: '落地页列表',
        routeName: 'landing-page-management',
        match: ['page-builder', 'feedback', 'landing-page-data']
      },
      {
        name: '表单模板',
        routeName: 'form-management',
        match: ['form-builder']
      },
      {
        name: '订单模板',
        routeName: 'order-management',
        match: ['order-builder']
      },
      {
        name: '评论模板',
        routeName: 'comment-management',
        match: ['comments-builder']
      }
    ]
  },
  {
    name: '客资',
    alias: '客资管理',
    icon: 'icon-kehuguanli',
    children: [
      {
        name: '客资列表',
        routeName: 'customer-management',
        match: ['form-client', 'replay']
      },
      {
        name: '客资状态',
        routeName: 'linkmen-status',
        match: ['linkmen-status']
      }
    ]
  },
  {
    name: '投放',
    alias: '自动化投放',
    icon: 'icon-toufang',
    children: [
      {
        routeName: 'account-list',
        name: '账户列表',
        match: ['account-list', 'ad-list', 'execution-record', 'personnel-management', 'strategy-execution-record', 'account-settings']
      },
      {
        routeName: 'strategy-library',
        name: '策略库',
        match: ['strategy-library', 'emp-strategy-record'],
      },
      {
        routeName: 'asset-library',
        name: '智能素材库',
        match: ['asset-library', 'asset-detail'],
      },
      {
        type: 'sep',
      },
      {
        routeName: 'remind-set',
        name: '通知设置',
      },
    ],
  },
  {
    name: '数据',
    alias: '数据概况',
    icon: 'icon-shuju',
    children: [
      { routeName: 'data-dashboard', name: '概况' },
      { routeName: 'data-realtime', name: '实时数据' },
      { routeName: 'data-area', name: '地区分布' },
      { routeName: 'data-source', name: '来源分析' },
      { routeName: 'data-devices', name: '设备分析' },
      { routeName: 'data-lp-analytics', name: '落地页分析' },
      { routeName: 'data-comparison', name: '对比分析' },
      { routeName: 'data-behavior', name: '用户行为' }
    ]
  }
])
const navWidth1 = 100
const navWidth2 = 110
  export default {
    data() {
      return {
        activeRouteName: '',
      }
    },
    mounted() {
      this.activeRouteName = this.$route.name
    },
    watch: {
      '$route.name'(name) {
        this.activeRouteName = name
      },
    },
    computed: {
      activeMenu() {
        return this.findActiveMenu(this.activeRouteName).top || {}
      },
      activeSubMenu() {
        return this.findActiveMenu(this.activeRouteName).sub || {}
      },
      allMenus() {
        return [...menuGroup1]
      },
      hasSubMenus() {
         return this.subMenus.length > 0
      },
      subMenus() {
        const menu = this.activeMenu
        return (menu && menu.children) || []
      },
      menuGroup1() {
        return this.filterMenus(menuGroup1)
      },
      menuWidth() {
        return (this.subMenus.length > 0) ? navWidth1 + navWidth2 : navWidth1
      }
    },
    methods: {
      findActiveMenu(routeName) {
        const menuItems = this.allMenus
        let top
        let sub

        const matchMenu = menu => {
          if (menu.routeName === routeName) {
            return true
          }
          const match = menu.match
          if (match) {
            return match.some(m => m === routeName)
          }
          return false
        }

        menuItems.forEach((topMenu, tIndex) => {
          if (topMenu.children) {
            topMenu.children.forEach((childMenu, cIndex) => {
              if (matchMenu(childMenu)) {
                top = tIndex
                sub = cIndex
              }
            })
          } else {
            if (matchMenu(topMenu)) {
              top = tIndex
            }
          }
        })
        return {
          top: menuItems[top],
          sub: !_.isUndefined(sub) && menuItems[top].children[sub]
        }
      },
      shouldMenuShow(menu) {
        if (this.memberType === '0' || this.memberType === 0) {
          return true
        }
        const permissionKey = PERMISSION_MAP[menu.routeName]
        return permissionKey
          ? guardArray(guardArray).some(hasPermission)
          : true
      },
      filterMenus(menus) {
        return menus
          .filter(this.shouldMenuShow)
          .map(menu => {
            if (menu.children) {
              return {
                ...menu,
                children: menu.children.filter(this.shouldMenuShow)
              }
            }
            return menu
          })
          .filter(menu => {
            return menu.routeName || (menu.children && menu.children.length > 0)
          })
      },
      handleMenuClick(menu, type) {
        let name = menu.routeName
        if (!name) {
          name = _.get(menu, 'children[0].routeName')
        }
        if (name) {
          this.$router.push({
            name
          })
        }
      }
    }
  }
</script>
