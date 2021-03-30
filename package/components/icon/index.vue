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
