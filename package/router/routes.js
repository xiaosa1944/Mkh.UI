export default [
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue'),
    meta: {
      title: '登录',
      cache: false,
      noFrame: true,
      noPermissionValidate: true,
    },
  },
  {
    // 403
    path: '/error/403',
    name: 'error403',
    component: () => import('../pages/403/index.vue'),
    meta: {
      title: 'Error 403',
      cache: false,
      noFrame: true,
      noPermissionValidate: true,
    },
  },
  {
    // 404
    path: '/error/404',
    name: 'error404',
    component: () => import('../pages/404/index.vue'),
    meta: {
      title: 'Error 404',
      cache: false,
      noFrame: true,
      noPermissionValidate: true,
    },
  },
  {
    // 404
    path: '/error/500',
    name: 'error500',
    component: () => import('../pages/500/index.vue'),
    meta: {
      title: 'Error 500',
      cache: false,
      noFrame: true,
      noPermissionValidate: true,
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404' },
]
