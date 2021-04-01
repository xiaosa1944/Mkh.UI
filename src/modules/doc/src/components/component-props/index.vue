<template>
  <div>{{ code }}</div>
</template>
<script>
export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup() {},
}
</script>
