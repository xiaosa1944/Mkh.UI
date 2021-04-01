<template>
  <div class="mu-demo-block">
    <div class="source">
      <slot />
    </div>
    <el-collapse-transition>
      <div v-show="showMeta" class="meta">
        <pre><code ref="codeRef" class="html hljs xml" v-text="meta"></code></pre>
      </div>
    </el-collapse-transition>
    <el-affix position="bottom" :offset="0">
      <div class="control" @click="handleShowMeta">
        <mu-button type="text" icon="code" :text="showMeta ? '隐藏代码' : '显示代码'" />
      </div>
    </el-affix>
  </div>
</template>
<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
import { getCurrentInstance, onMounted, ref } from 'vue'

export default {
  props: {
    meta: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const codeRef = ref()
    const showMeta = ref(false)

    const handleShowMeta = () => {
      showMeta.value = !showMeta.value
    }

    onMounted(() => {
      hljs.highlightElement(codeRef.value)
    })

    return {
      codeRef,
      showMeta,
      handleShowMeta,
    }
  },
}
</script>
<style lang="scss">
.mu-demo-block {
  .source {
    padding: 24px;
    background: #fff;
  }

  .meta {
    pre {
      margin: 0;
    }
    .hljs,
    .hljs-subst {
      padding: 18px 24px;
      font-size: 14px;
      background-color: #fafafa;
    }
  }

  .control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;

    .el-button--text {
      color: #d3dce6;
    }

    &:hover {
      background-color: #f9fafc;

      .el-button--text {
        color: #409eff;
      }
    }
  }
}
</style>
