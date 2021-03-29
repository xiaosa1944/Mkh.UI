<template>
  <mu-flex-row fix="50%" class="mu-header">
    <template #left>
      <ul class="mu-header_left">
        <li>
          <img class="mu-header_logo" :src="logo" />
        </li>
        <li>
          <span class="mu-header_title">{{ title }}</span>
        </li>
      </ul>
    </template>
    <template #right>
      <!--账户信息-->
      <div class="mu-header_userinfo">
        <el-dropdown trigger="click">
          <a class="mu-header_userinfo_avatar" href="javascript:void(0);">
            <img :src="account.avatar" />
          </a>
          <template #dropdown>
            <el-dropdown-menu class="mu-header_userinfo_dropdown">
              <el-dropdown-item>
                <mu-icon name="user"></mu-icon>
                账户信息
              </el-dropdown-item>
              <el-dropdown-item divided>
                <mu-icon name="logout"></mu-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--工具栏-->
      <div class="mu-header_toolbar">
        <!--全屏-->
        <mu-toolbar-fullscreen />
      </div>
    </template>
  </mu-flex-row>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const { title, logo } = MkhUI.config.site
    const account = computed(() => store.state.app.account)

    return {
      title,
      logo,
      account,
    }
  },
}
</script>
