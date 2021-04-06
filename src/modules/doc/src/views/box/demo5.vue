<template>
  <mu-box header icon="wifi" :loading="loading" :toolbar="{ refresh: true }" @refresh="handleRefresh">
    <template #title> 加载动画，点击右边<mu-icon class="mu-margin-l-10 mu-font-size-25" name="hand-right" />的刷新图标 </template>
    <pre>
      明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。
      转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。
    </pre>
  </mu-box>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const loading = ref(false)

    const handleRefresh = () => {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 1500)
    }

    return {
      loading,
      handleRefresh,
    }
  },
}
</script>
