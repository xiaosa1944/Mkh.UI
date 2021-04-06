export default {
  //标题
  title: '图标',
  //图标
  icon: 'icon',
  //路由名称，需要唯一，推荐使用模块编码+下划线开头
  name: 'doc_icon',
  //路由路径
  path: '/doc/icon',
  //绑定权限
  permissions: [],
  //绑定按钮
  buttons: [],
  //路由组件
  component: () => import('./index.vue'),
}
