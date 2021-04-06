<template>
  <div class="mu-demo-block">
    <h1 class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>
    <p class="desc">
      <slot name="desc">
        {{ desc }}
      </slot>
    </p>
    <div class="source">
      <slot />
    </div>
    <el-collapse-transition>
      <div v-show="showMeta" class="meta">
        <mu-doc-highlightjs :code="meta"></mu-doc-highlightjs>
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
import { onMounted, ref } from 'vue'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    meta: {
      type: String,
      required: true,
    },
  },
  setup() {
    const codeRef = ref()
    const showMeta = ref(false)

    const handleShowMeta = () => {
      showMeta.value = !showMeta.value
    }

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
  .title {
    margin: 55px 0 20px;
    font-weight: 400;
    font-size: 23px;
    color: #1f2f3d;
  }
  .desc {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;

    code {
      padding: 4px;
      margin: 0 4px;
      border: 1px solid #eaeefb;
      border-radius: 4px;
      background-color: #e4e7ed;
      color: #409eff;
    }
  }
  .source {
    padding: 24px;
    background: #fff;

    .el-link {
      margin: 0 5px;
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
