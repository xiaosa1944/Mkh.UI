<template>
  <mu-dialog v-model="visible" custom-class="mu-form-dialog" :loading="loading" :loading-text="loadingText" :loading-background="loadingBackground" :loading-spinner="loadingSpinner">
    <mu-form ref="formRef" :action="action" :model="model" :rules="rules" no-loading @validate-success="loading = true" @success="handleSuccess" @error="handleError">
      <slot />
    </mu-form>

    <template #footer>
      <slot name="footer">
        <mu-button v-if="btnOk && !disabled" type="success" :text="btnOkText || $t('mkh.formDialog.btnOkText')" @click="submit"></mu-button>
        <mu-button v-if="btnReset && !disabled" type="info" :text="$t('mkh.formDialog.btnResetText')" @click="reset"></mu-button>
      </slot>
    </template>
  </mu-dialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { useVisible } from '../../composables'
import props from './props'
export default {
  name: 'FormDialog',
  props,
  emits: ['success', 'error'],
  setup(props, { emit }) {
    const cit = getCurrentInstance().proxy
    const formRef = ref(null)
    const loading = ref(false)

    const submit = () => {
      formRef.value.submit()
    }

    const reset = () => {
      formRef.value.reset()
    }

    const handleSuccess = data => {
      loading.value = false
      cit.$message({
        type: 'success',
        message: cit.$t('mkh.formDialog.successMsg'),
      })
      emit('success', data)
    }

    const handleError = () => {
      loading.value = false
      emit('error', data)
    }

    return {
      ...useVisible(props, emit),
      formRef,
      loading,
      submit,
      reset,
      handleSuccess,
      handleError,
    }
  },
}
</script>
