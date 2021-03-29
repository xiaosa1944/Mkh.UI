<template>
  <div class="mu-wrapper">
    <mu-header />
    <mu-breadcrumb />
    <mu-main />
  </div>
</template>
<script>
import MuHeader from './components/header/index.vue'
import MuMain from './components/main/index.vue'
export default {
  components: { MuHeader, MuMain },
}
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
