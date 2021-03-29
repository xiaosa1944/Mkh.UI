<template>
  <mu-container>
    <h1>账户管理</h1>
    <el-button type="primary" @click="$router.push('/admin/role')">角色管理</el-button>
    <el-button type="warning" @click="$router.push('/admin/account/add')">子路由</el-button>
    <el-button type="danger" @click="$router.push('/admin/account/edit')">编辑子路由</el-button>
    <router-view></router-view>
  </mu-container>
</template>
