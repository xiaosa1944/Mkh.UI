<template>
  <el-dialog
    ref="elDialogRef"
    v-model="visible"
    :top="top"
    :custom-class="class_"
    :show-close="false"
    :width="width"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
    :lock-scroll="lockScroll"
    :append-to-body="appendToBody"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <!--头部-->
    <template v-if="header" #title>
      <mu-flex-row mode="right">
        <mu-flex-left>
          <div v-if="icon" class="mu-dialog_icon">
            <mu-icon :name="icon" :style="{ color: iconColor || '' }" />
          </div>
          <div class="mu-dialog_title">
            <slot name="title">{{ title }}</slot>
          </div>
        </mu-flex-left>
        <mu-flex-right>
          <section class="mu-dialog_toolbar">
            <!--工具栏插槽-->
            <slot name="toolbar" />
            <!--全屏按钮-->
            <mu-button v-if="showFullscreen" :icon="isFullscreen ? 'full-screen-exit' : 'full-screen'" @click="toggleFullscreen" />
            <!--关闭按钮-->
            <mu-button v-if="showClose" icon="close" @click="close" />
          </section>
        </mu-flex-right>
      </mu-flex-row>
    </template>
    <!--内容-->
    <section class="mu-dialog_body">
      <mu-scrollbar>
        <slot />
      </mu-scrollbar>
    </section>
    <!--尾部-->
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script>
import { computed, ref } from 'vue'
import { useVisible, useFullscreen } from '../../composables'
import { on, off } from '@/utils/dom'
export default {
  name: 'Dialog',
  props: {
    modelValue: Boolean,
    /** 显示头部 */
    header: {
      type: Boolean,
      default: true,
    },
    /** 标题 */
    title: {
      type: String,
      default: '',
    },
    /** 图标 */
    icon: {
      type: String,
      default: '',
    },
    /**图标颜色 */
    iconColor: {
      type: String,
      default: '',
    },
    /** 宽度 */
    width: {
      type: String,
      default: '50%',
    },
    /** 高度 */
    height: {
      type: String,
      default: '',
    },
    /** 距离顶部的高度 */
    top: {
      type: String,
      default: '50px',
    },
    /** 自定义类名 */
    customClass: {
      type: String,
      default: '',
    },
    /** 是否需要遮罩层 */
    modal: {
      type: Boolean,
      default: true,
    },
    /** 是否可以通过点击 modal 关闭 Dialog */
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    /** 显示关闭按钮 */
    showClose: {
      type: Boolean,
      default: true,
    } /** 显示全屏按钮 */,
    showFullscreen: {
      type: Boolean,
      default: true,
    },
    /** 关闭前的回调，会暂停 Dialog 的关闭 */
    beforeClose: {
      type: Function,
      default: null,
    },
    /** 关闭时销毁 Dialog 中的元素 */
    destroyOnClose: Boolean,
    /** 是否在 Dialog 出现时将 body 滚动锁定 */
    lockScroll: {
      type: Boolean,
      default: true,
    },
    /** Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true */
    appendToBody: Boolean,
    /** 不包含内边距 */
    noPadding: Boolean,
    /** 可拖拽的 */
    draggable: {
      type: Boolean,
      default: false,
    },
    /** 是否可拖出页面 */
    dragOutPage: {
      type: Boolean,
      default: false,
    },
    /** 拖拽出页面后保留的最小宽度，单位px */
    dragMinWidth: {
      type: Number,
      default: 100,
    },
  },
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],
  setup(props, ctx) {
    //全屏操作
    const { isFullscreen, openFullscreen, closeFullscreen, toggleFullscreen } = useFullscreen(ctx.emit)

    //使用当前时间戳创建唯一ID
    const class_ = computed(() => {
      const { customClass, noPadding, draggable } = props
      let classList = ['mu-dialog', `mu-dialog-${new Date().getTime()}`]
      if (customClass) classList.push(props.customClass)
      if (noPadding) classList.push('no-padding')
      if (isFullscreen.value) classList.push('is-fullscreen')
      if (draggable) classList.push('draggable')

      return classList.join(' ')
    })

    //宽度值，单位px
    const widthNumber = computed(() => {
      const width = props.width
      if (width.endsWith('%')) {
        return (document.body.offsetWidth / 100) * parseInt(width.replace('%', ''))
      }

      if (width.endsWith('px')) {
        return parseInt(width.replace('%', ''))
      }

      return (document.body.offsetWidth / 100) * 50
    })
    const { visible, open, close } = useVisible(props, ctx.emit)

    const elDialogRef = ref(null)
    let dialogEl = null
    let dialogHeaderEl = null
    let dragDownState = null

    //重置窗口大小
    const resize = () => {
      //如果未设置高度，动态计算对话框高度
      const height = props.height || document.body.clientHeight - parseInt(props.top.replace('px', '')) * 2 + 'px'
      dialogEl.style.height = height
    }

    const handleOpen = () => {
      dialogEl = elDialogRef.value.dialogRef
      const { draggable, height } = props

      //开启拖拽功能，先计算初始坐标再计算大小
      if (draggable) {
        //拖拽模式对话框的定位会设置为fixed模式，所以需要重新计算对话框的left属性
        dialogEl.style.left = (document.body.offsetWidth - widthNumber.value) / 2 + 'px'
        dialogEl.style.top = props.top

        dialogHeaderEl = dialogEl.querySelector('.el-dialog__header')
        on(dialogHeaderEl, 'mousedown', handleDragDown)
      }

      resize()

      //监听window窗口大小改变事件
      if (!height) {
        on(window, 'resize', resize)
      }

      ctx.emit('open')
    }

    const handleOpened = () => {
      ctx.emit('opened')
    }

    const handleClose = () => {
      ctx.emit('close')

      //关闭window窗口大小改变事件
      if (!props.height) off(window, 'resize', resize)
    }

    const handleClosed = () => {
      ctx.emit('closed')
    }

    const handleDragDown = e => {
      //开启拖拽并且不是全屏模式的情况才可以拖拽
      if (props.draggable && !isFullscreen.value) {
        dragDownState = e

        on(document, 'mousemove', handleDragMove)
        on(document, 'mouseup', handleDragUp)
      }
    }

    const handleDragMove = e => {
      const { dragOutPage, dragMinWidth } = props
      let left = dialogEl.offsetLeft + (e.clientX - dragDownState.clientX)
      let top = dialogEl.offsetTop + (e.clientY - dragDownState.clientY)
      let leftMax = document.body.offsetWidth - dialogEl.offsetWidth
      let leftMin = 0
      let topMax = document.body.offsetHeight - dialogEl.offsetHeight
      let topMin = 0

      if (dragOutPage) {
        leftMax = document.body.offsetWidth - dragMinWidth
        leftMin = -dialogEl.offsetWidth + dragMinWidth
        topMax = document.body.offsetHeight - dialogHeaderEl.offsetHeight
      }

      dialogEl.style.left = Math.max(leftMin, Math.min(left, leftMax)) + 'px'
      dialogEl.style.top = Math.max(topMin, Math.min(top, topMax)) + 'px'

      dragDownState = e
    }

    const handleDragUp = e => {
      off(document, 'mousemove', handleDragMove)
      off(document, 'mouseup', handleDragUp)
    }

    return {
      class_,
      visible,
      open,
      close,
      isFullscreen,
      openFullscreen,
      closeFullscreen,
      toggleFullscreen,
      elDialogRef,
      handleOpen,
      handleOpened,
      handleClose,
      handleClosed,
    }
  },
}
</script>
