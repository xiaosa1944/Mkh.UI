<template>
  <svg class="mu-icon" :class="iconClass" aria-hidden="true">
    <use :xlink:href="`#mu-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss">
//图标
.mu-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
