<template>
  <div class="mu-breadcrumb">
    <mu-icon class="mu-breadcrumb_menu" name="menu" @click="handleMeunCollapse" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="(bc, i) in list">
        <el-breadcrumb-item v-if="bc.to" :key="i" :to="bc.to"> {{ bc.label }} </el-breadcrumb-item>
        <el-breadcrumb-item v-else :key="i + 1"> {{ bc.label }} </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const store = useStore()

    const list = computed(() => {
      const { breadcrumbs, title, icon } = route.meta
      if (!breadcrumbs) {
        return [{ label: title, icon: icon }]
      }

      return [...breadcrumbs, { label: title, icon: icon }]
    })

    const handleMeunCollapse = () => {
      store.commit('app/skin/brief/collapseMenu')
    }

    return {
      list,
      handleMeunCollapse,
    }
  },
}
</script>
