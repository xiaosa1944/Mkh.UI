import { getCurrentInstance } from 'vue'

export default function () {
  const { $loading } = getCurrentInstance().proxy
  const defaultOptions = MkhUI.config.component.$loading
  let loading

  const open = options => {
    loading = $loading(Object.assign({}, defaultOptions, options))
  }

  const close = () => {
    loading.close()
  }

  return {
    open,
    close,
  }
}
