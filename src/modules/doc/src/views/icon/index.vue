<template>
  <mu-container scrollbar>
    <mu-doc-component-doc title="图标组件(mu-box)" :props="props">
      <mu-doc-demo-block title="简单用法" :meta="code">
        <template #desc>
          图标组件是基于阿里矢量图表库<el-link href="https://www.iconfont.cn/">https://www.iconfont.cn/</el-link
          >封装的，用户也可以通过导入自己从阿里图表库下载的<code>iconfont.js</code>文件的方式来添加自己的图标
        </template>
        <demo></demo>
      </mu-doc-demo-block>
    </mu-doc-component-doc>
  </mu-container>
</template>
<script>
import demo from './demos/1.vue'
import code from '!./demos/1.vue'
import props from './_props'
export default {
  components: { demo },
  setup() {
    return {
      code,
      props,
    }
  },
}
</script>
