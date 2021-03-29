<template>
  <section :class="['mu-flex-row', fixMode]">
    <section class="mu-flex-row_left" :style="{ width: fixMode === 'left' ? width : '' }">
      <slot name="left" />
    </section>
    <section class="mu-flex-row_right" :style="{ width: fixMode === 'right' ? width : '' }">
      <slot name="right" />
    </section>
  </section>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'FlexRow',
  props: {
    /**
     * 固定宽度
     */
    fix: {
      type: [String, Number],
      required: true,
    },
    /**
     * 固定模式，left是左侧固定，右边响应式，right反之
     */
    fixMode: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value)
      },
      default: 'left',
    },
  },
  setup(props) {
    return {
      width: computed(() => {
        if (typeof props.fix === 'number') return props.fix + 'px'
        return props.fix
      }),
    }
  },
}
</script>
<style lang="scss">
$prefix: '.mu-flex-row';
#{$prefix} {
  display: flex;
  align-items: stretch;
  flex-direction: row;

  &.left {
    #{$prefix}_left {
      flex-shrink: 0;
    }

    #{$prefix}_right {
      flex-grow: 1;
      overflow: hidden;
      box-sizing: border-box;
    }
  }

  &.right {
    #{$prefix}_left {
      flex-grow: 1;
      overflow: hidden;
      box-sizing: border-box;
    }

    #{$prefix}_right {
      flex-shrink: 0;
    }
  }
}
</style>
