<template>
  <section
    v-loading="loading"
    :class="class_"
    :style="{ height }"
    :element-loading-text="loadingText || loadingOptions.text"
    :element-loading-background="loadingBackground || loadingOptions.background"
    :element-loading-spinner="loadingSpinner || loadingOptions.spinner"
  >
    <!--头部-->
    <header v-if="header" class="mu-box_header">
      <slot name="header">
        <div v-if="icon" class="mu-box_header_icon">
          <mu-icon :name="icon" />
        </div>
        <!--标题-->
        <div class="mu-box_header_title">
          <slot name="title">{{ title }}</slot>
        </div>
        <!--工具栏前面的区域-->
        <div class="mu-box_header_toolbar_before">
          <slot name="toolbar-before" />
        </div>
        <!--工具栏-->
        <div ref="toolbar" class="mu-box_header_toolbar">
          <!--工具栏插槽-->
          <slot name="toolbar" />
          <!--刷新按钮-->
          <mu-button v-if="toolbar.refresh" icon="refresh" @click="$emit('refresh')" />
          <!--折叠按钮，页模式下折叠功能无效-->
          <mu-button v-if="toolbar.collapse || !page" :icon="isCollapse ? 'chevron-down' : 'chevron-up'" @click="toggleCollapse" />
          <!--全屏按钮-->
          <mu-button v-if="toolbar.fullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
        </div>
      </slot>
    </header>
    <el-collapse-transition>
      <section v-show="!isCollapse" class="mu-box_dialog">
        <section class="mu-box_content">
          <section v-if="showScrollbar" class="mu-box_wrapper">
            <mu-scrollbar ref="scrollbarRef" :horizontal="horizontal">
              <slot />
            </mu-scrollbar>
          </section>
          <slot v-else />
        </section>
        <footer v-if="footer" :class="['mu-box_footer', footerAlign]">
          <slot name="footer"></slot>
        </footer>
      </section>
    </el-collapse-transition>
  </section>
</template>
<script>
import { computed, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import useCollapse from '../../composables/useCollapse'
import useFullscreen from '../../composables/useFullscreen'
export default {
  name: 'Box',
  props: {
    /** 标题 */
    title: {
      type: String,
      default: null,
    },
    /** 图标 */
    icon: {
      type: String,
      default: null,
    },
    /** 显示头部 */
    header: {
      type: Boolean,
      default: false,
    },
    /** 显示底部 */
    footer: {
      type: Boolean,
      default: false,
    },
    /** 底部对齐方式 */
    footerAlign: {
      type: String,
      default: 'right',
    },
    /** 高度 */
    height: {
      type: String,
      default: null,
    },
    /** 是否显示水平滚动条 */
    horizontal: {
      type: Boolean,
      default: false,
    },
    /** 显示加载动画 */
    loading: {
      type: Boolean,
      default: false,
    },
    /** 加载动画文本 */
    loadingText: {
      type: String,
      default: null,
    },
    /** 加载动画背景色 */
    loadingBackground: {
      type: String,
      default: null,
    },
    /** 加载动画图标 */
    loadingSpinner: {
      type: String,
      default: null,
    },
    /** 是否页模式 */
    page: {
      type: Boolean,
      default: false,
    },
    /** 不显示滚动条 */
    noScrollbar: {
      type: Boolean,
      default: false,
    },
    /** 没有内边距 */
    noPadding: {
      type: Boolean,
      default: false,
    },
    /** 右侧工具栏 */
    toolbar: {
      type: Object,
      default() {
        return {
          /** 刷新 */
          refresh: true,
          /** 折叠 */
          collapse: true,
          /** 全屏 */
          fullscreen: true,
        }
      },
    },
  },
  emits: ['refresh', 'fullscreen-change', 'collapse-change'],
  setup(props, ctx) {
    const store = useStore()
    const scrollbarRef = ref()
    const loadingOptions = MkhUI.config.component.loading

    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)

    const class_ = computed(() => {
      return ['mu-box', store.state.app.skin.fontSize, isFullscreen.value ? 'fullscreen' : '', props.height ? 'has-height' : '', props.page ? 'page' : '', props.noPadding ? 'no-padding' : '']
    })

    //判断是否显示滚动条
    const showScrollbar = computed(() => {
      return !props.noScrollbar.value && (props.height || props.page)
    })

    //重置滚动条
    const resizeScrollbar = () => {
      if (showScrollbar.value) {
        scrollbarRef.value.update()
      }
    }

    return {
      ...useCollapse(ctx.emit),
      class_,
      scrollbarRef,
      loadingOptions,
      showScrollbar,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      resizeScrollbar,
    }
  },
}
</script>
