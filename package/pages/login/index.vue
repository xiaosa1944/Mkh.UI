<template>
  <div class="mu-login-container">
    <component :is="`mu-login-${loginComponent}`"></component>
  </div>
</template>
<script>
export default {
  setup() {
    const { loginComponent } = MkhUI.config.site

    return {
      loginComponent,
    }
  },
}
</script>
<style lang="scss">
.mu-login-container {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
