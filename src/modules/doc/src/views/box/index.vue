<template>
  <mu-container scrollbar>
    <h1 class="mu-doc-title">盒子组件(mu-box)</h1>
    <mu-doc-demo-block title="简单盒子" :meta="code1">
      <template #desc>
        盒子组件与Element Plus中的<el-link type="primary" target="_blank" href="https://element-plus.gitee.io/#/zh-CN/component/card">卡片组件(el-card)</el-link>类似，但是可选功能上要比它多一些
      </template>
      <demo-1></demo-1>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="带头部标题和图片的盒子" :meta="code2">
      <template #desc> 可以通过设置<code>header</code>、<code>title</code>、<code>icon</code>为盒子添加头部、标题、左侧图标 </template>
      <demo-2></demo-2>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="头部工具栏" :meta="code3">
      <template #desc>
        <p>盒子头部的右侧是工具栏区域，并且内置了刷新、折叠、全屏三个功能，可通过<code>toolbar</code>属性进行配置，刷新功能需要用户自行监听<code>refresh</code>事件来执行刷新操作</p>
        <p>盒子同时提供了<code>toolbar</code>插槽，该插槽位于内置功能的前面，你如果希望添加自定义的工具，可在该插槽中添加。</p>
      </template>
      <demo-3></demo-3>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="底部功能栏" :meta="code4">
      <template #desc>
        <p>盒子提供了<code>footer</code>属性来显示一个底部功能栏，同时配套提供了<code>footer</code>插槽供用户自定义。</p>
        <p>一般情况用户都是在底部功能栏放一些按钮，默认底部功能栏里的内容是靠右对齐的，当然，您可以通过<code>footer-align</code>属性设置对齐方式，如居中<code>center</code>、居左<code>left</code></p>
      </template>
      <demo-4></demo-4>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="加载动画" :meta="code5">
      <template #desc>
        <p>盒子提供了加载动画的效果，用于当执行耗时操作(比如接口请求)时给用户一个友好提示。</p>
        <p>当然，你也可以通过加载动画相关的属性来对加载动画样式自定义~</p>
      </template>
      <demo-5></demo-5>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="内容自适应" :meta="code6">
      <template #desc>
        <p>当给盒子设置了<code>height</code>属性后，盒子的内容区域会变成自适应，当内容超出会出现滚动条。</p>
        <p>盒子同时提供了<code>page</code>属性，该属性会让盒子充满父级节点，相当于<code>height:100%</code>。</p>
        <p>如果您动态修改了盒子中的内容，有可能会出现滚动条错乱的情况，此时可以通过组件提供的<code>resizeScrollbar</code>方法来重置滚动条。</p>
      </template>
      <demo-6></demo-6>
    </mu-doc-demo-block>

    <mu-doc-demo-block title="盒子布局" :meta="code7">
      <template #desc>
        <p>当给盒子设置了<code>height</code>属性后，盒子的内容区域会变成自适应，当内容超出会出现滚动条。</p>
      </template>
      <demo-7></demo-7>
    </mu-doc-demo-block>
  </mu-container>
</template>
<script>
import demo1 from './demo1.vue'
import code1 from '!./demo1.vue'
import demo2 from './demo2.vue'
import code2 from '!./demo2.vue'
import demo3 from './demo3.vue'
import code3 from '!./demo3.vue'
import demo4 from './demo4.vue'
import code4 from '!./demo4.vue'
import demo5 from './demo5.vue'
import code5 from '!./demo5.vue'
import demo6 from './demo6.vue'
import code6 from '!./demo6.vue'
import demo7 from './demo7.vue'
import code7 from '!./demo7.vue'
export default {
  components: { demo1, demo2, demo3, demo4, demo5, demo6, demo7 },
  setup() {
    return {
      code1,
      code2,
      code3,
      code4,
      code5,
      code6,
      code7,
    }
  },
}
</script>
