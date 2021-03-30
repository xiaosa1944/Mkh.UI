<template>
  <mu-container>
    <h1>账户管理--{{ type }}</h1>
    <mu-button type="primary" text="角色管理" icon="truck-monster" to="/admin/role" />
    <mu-button type="warning" text="子路由" to="/admin/account/add" />
    <mu-button type="danger" text="编辑子路由" to="/admin/account/edit" />
    <router-view></router-view>
  </mu-container>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
    },
  },
}
</script>
