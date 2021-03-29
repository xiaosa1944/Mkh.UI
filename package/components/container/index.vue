<template>
  <section class="mu-container" :class="{ 'is-horizontal': horizontal }">
    <section class="mu-container-main">
      <mu-scrollbar v-if="scrollbar" :horizontal="horizontal">
        <slot />
      </mu-scrollbar>
      <slot v-else />
    </section>
  </section>
</template>
<script>
export default {
  name: 'Container',
  props: {
    /** 滚动条 */
    scrollbar: Boolean,
    /** 是否显示水平滚动条 */
    horizontal: Boolean,
  },
}
</script>
<style lang="scss">
.mu-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 5px;

  &-main {
    padding: 5px;
    height: 100%;
    box-sizing: border-box;

    > .mu-scrollbar {
      .el-scrollbar__wrap {
        overflow-x: hidden;

        .el-scrollbar__view {
          height: 100%;
        }
      }

      .is-horizontal {
        display: none;
      }
    }
  }

  &.is-horizontal {
    .is-horizontal {
      display: block;
    }
  }
}
</style>
