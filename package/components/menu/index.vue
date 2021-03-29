<template>
  <div :class="['mu-menu', isCollapse ? 'is-collapse' : '']">
    <mu-scrollbar>
      <el-menu :default-active="defaultActive" class="mu-menu-wrapper" :collapse="isCollapse"> <menu-item :menus="menus" /> </el-menu>
    </mu-scrollbar>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import MenuItem from './item.vue'
export default {
  name: 'Menu',
  components: { MenuItem },
  setup() {
    const store = useStore()

    const defaultActive = computed(() => {
      const { current } = store.state.app.page
      if (current.name && routeMenus) {
        let routeMenu = routeMenus.get(current.code)
        if (routeMenu) {
          return routeMenu.menu.id
        }
      }
      return '-1'
    })

    return {
      defaultActive,
      menus: store.state.app.account.menus,
      isCollapse: computed(() => store.state.app.skin.brief.menuIsCollapse),
    }
  },
}
</script>
