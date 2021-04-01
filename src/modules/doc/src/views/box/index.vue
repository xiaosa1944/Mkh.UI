<template>
  <mu-container scrollbar>
    <h1>基础用法</h1>
    <mu-doc-demo-block :meta="component">
      <demo-1></demo-1>
    </mu-doc-demo-block>
  </mu-container>
</template>
<script>
import code from '!./demo1.vue'
import demo1 from './demo1.vue'
import component from '!/package/components/box/index.vue'
export default {
  components: { demo1 },
  setup() {
    return {
      component,
      code,
    }
  },
}
</script>
