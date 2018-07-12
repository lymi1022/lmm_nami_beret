import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }, {
      path: '/',
      component: () => import('@/views/home'),
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('@/views/home_page/home_page')
        },
        {
          path: '/customer',
          component: () => import('@/views/customer/home'),
          children: [
            {
              path: '',
              name: 'customer-management',
              component: () => import('@/views/customer/customer'),
            },
            {
              path: 'linkmen-status',
              name: 'linkmen-status',
              component: () => import('@/views/setting/system/linkmen_status'),
            },
            {
              name: 'replay',
              path: '/replay',
              component: () => import('@/views/replay_actions/replay_actions'),
            },
          ],
        }, {
          path: '/landing-page',
          component: () => import('@/views/landing_page/home'),
          children: [
            {
              path: '',
              name: 'landing-page-management',
              component: () => import('@/views/landing_page/landing_page_list/index'),
            },
            {
              path: 'page-builder/:id',
              name: 'page-builder',
              component: () => import('@/views/landing_page/page_builder/page_builder'),
            },
            {
              path: 'form',
              name: 'form-management',
              component: () => import('@/views/tool/form'),
            }, {
              path: 'comment',
              name: 'comment-management',
              component: () => import('@/views/tool/comment'),
            },
            {
              path: 'order',
              name: 'order-management',
              component: () => import('@/views/tool/order'),
            },
          ],
        },
        {
          path: '/ad-serving',
          component: () => import('@/views/deploy/home'),
          children: [
            {
              path: '',
              component: () => import('@/views/deploy/account_management/account_management'),
              children: [
                {
                  path: '',
                  name: 'account-list',
                  component: () => import('@/views/deploy/account_list/account_list'),
                },
              ],
            },
            {
              path: 'asset-library',
              name: 'asset-library',
              component: () => import('@/views/asset_library/asset_library'),
            },
            {
              path: 'strategy-library',
              component: () => import('@/views/deploy/strategy_home'),
              children: [
                {
                  path: 'list',
                  name: 'strategy-library',
                  component: () => import('@/views/deploy/strategy_library/strategy_library'),
                },
              ],
            },
          ],
        },
        {
          path: '/analytics',
          component: () => import('@/views/analytics/home'),
          children: [
            {
              path: '',
              name: 'data-dashboard',
              component: () => import('@/views/analytics/dashboard'),
            },
            {
              path: 'now',
              name: 'data-realtime',
              component: () => import('@/views/analytics/now'),
            },
            {
              path: 'pages',
              name: 'data-lp-analytics',
              component: () => import('@/views/analytics/pages'),
            },
            {
              path: 'compare',
              name: 'data-comparison',
              component: () => import('@/views/analytics/compare'),
            },
            {
              path: 'area',
              name: 'data-area',
              component: () => import('@/views/analytics/area'),
            },
            {
              path: 'source',
              name: 'data-source',
              component: () => import('@/views/analytics/source'),
            },
            {
              path: 'behavior',
              name: 'data-behavior',
              component: () => import('@/views/analytics/behavior'),
            },
            {
              path: 'device',
              name: 'data-devices',
              component: () => import('@/views/analytics/device'),
            },
          ],
        },
        {
          path: 'setting',
          component: () => import('@/views/setting/home'),
          children: [
            {
              path: 'remind-set',
              name: 'remind-set',
              component: () => import('@/views/setting/personal/remind_set'),
            },
          ],
        },
      ]
    }
  ]
})
