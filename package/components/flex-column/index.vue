<template>
  <section :class="['mu-flex-column', fixMode]">
    <section class="mu-flex-column_top" :style="{ height: fixMode === 'top' ? fix : '' }">
      <slot name="top" />
    </section>
    <section class="mu-flex-column_bottom" :style="{ height: fixMode === 'bottom' ? fix : '' }">
      <slot name="bottom" />
    </section>
  </section>
</template>
<script>
export default {
  name: 'Flex',
  props: {
    /**
     * 固定高度
     */
    fix: {
      type: String,
      required: true,
    },
    /**
     * 固定模式，top是顶部固定，右边响应式，bottom反之
     */
    fixMode: {
      type: String,
      validator(value) {
        return ['top', 'bottom'].includes(value)
      },
      default: 'top',
    },
  },
}
</script>
<style lang="scss">
$prefix: 'mu-flex-column';
.#{$prefix} {
  display: flex;
  align-items: stretch;
  flex-direction: column;

  &.top {
    #{$prefix}_top {
      flex-shrink: 0;
    }

    #{$prefix}_bottom {
      flex-grow: 1;
      overflow: hidden;
      box-sizing: border-box;
    }
  }

  &.bottom {
    #{$prefix}_top {
      flex-grow: 1;
      overflow: hidden;
      box-sizing: border-box;
    }

    #{$prefix}_bottom {
      flex-shrink: 0;
    }
  }
}
</style>
