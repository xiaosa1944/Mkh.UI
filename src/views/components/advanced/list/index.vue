<template>
  <mu-container>
    <mu-doc-component-doc title="对话框组件(mu-dialog)" :props="props" :events="events" :methods="methods" :slots="slots">
      <mu-doc-demo-block title="简单对话框" :meta="code1">
        <template #desc>
          <p>对话框组件是在Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/dialog">Dialog组件(el-card)</el-link>基础上封装。</p>
          <p>包含其所有功能的同时，扩展了一些额外功能，如：全屏按钮、自定义顶部工具栏，左侧图标，内容区域滚动条，拖拽等等</p>
        </template>
        <demo-1></demo-1>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import props from './_props'
import events from './_events'
import methods from './_methods'
import slots from './_slots'
import demo1 from './demos/1.vue'
import code1 from '!./demos/1.vue'
export default {
  components: { demo1 },
  setup() {
    return {
      props,
      events,
      methods,
      slots,
      code1,
    }
  },
}
</script>
