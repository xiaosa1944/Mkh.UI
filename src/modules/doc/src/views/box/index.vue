<template>
  <mu-container>
    <demo-1></demo-1>
    <mu-doc-component-props :code="component" />
  </mu-container>
</template>
<script>
import code from '!./demo1.vue'
import demo1 from './demo1.vue'
import component from '!/package/components/box/index.vue'
export default {
  components: { demo1 },
  setup() {
    console.log(component)
    return {
      component,
    }
  },
}
</script>
