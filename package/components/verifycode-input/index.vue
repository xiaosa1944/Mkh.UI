<template>
  <div class="verifycode-input">
    <div>
      <el-form-item :label="label" :prop="prop">
        <el-input :model-value="modelValue" autocomplete="off" placeholder="验证码" clearable @input="handleInput">
          <template #prefix>
            <mu-icon name="adn"></mu-icon>
          </template>
        </el-input>
      </el-form-item>
    </div>
    <div class="verifycode-input_img">
      <el-tooltip effect="dark" content="点击刷新" placement="top">
        <img :src="verifyCodeUrl" @click="refreshVerifyCode" />
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import { computed, ref, toRefs, watch } from 'vue'
export default {
  name: 'VerifycodeInput',
  props: {
    prop: {
      type: String,
      default: 'verifyCode.code',
    },
    modelValue: {
      type: String,
      default: '',
    },
    id: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'update:id'],
  setup(props, ctx) {
    const { getVerifyCode } = MkhUI.config.actions
    const verifyCodeUrl = ref()

    //刷新验证码
    const refreshVerifyCode = () => {
      getVerifyCode().then(data => {
        verifyCodeUrl.value = data.base64String
        ctx.emit('update:id', data.id)
        ctx.emit('update:modelValue', '')
      })
    }
    refreshVerifyCode()

    const handleInput = val => {
      ctx.emit('update:modelValue', val)
    }

    return {
      verifyCodeUrl,
      refreshVerifyCode,
      handleInput,
    }
  },
}
</script>
<style lang="scss">
.verifycode-input {
  position: relative;
  padding-right: 110px;

  &_img {
    position: absolute;
    bottom: -3px;
    right: 0;
    cursor: pointer;
  }
}
</style>
