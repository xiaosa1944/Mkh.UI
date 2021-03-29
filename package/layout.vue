<template>
  <!--框架内显示-->
  <component :is="skinCode" v-if="!noFrame"></component>
  <!--不在框架中显示-->
  <router-view v-else />
</template>
<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const skinCode = computed(() => {
      return `mu-skin-${store.state.app.skin.code.toLowerCase()}`
    })

    //给body附加皮肤class
    const app = () => {
      document.body.className = skinCode.value
    }

    app()

    //监听皮肤切换
    watch(skinCode, app)

    const noFrame = computed(() => route.meta.noFrame || true)

    return {
      skinCode,
      noFrame,
    }
  },
}
</script>
