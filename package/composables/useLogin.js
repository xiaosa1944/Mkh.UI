import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function (model) {
  const { $notify } = getCurrentInstance().proxy
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const loading = ref(false)
  const formRef = ref(null)

  let { redirect } = route.query
  if (!redirect) {
    redirect = '/'
  }

  //如果令牌存在，则直接跳转
  const { accessToken } = store.state.app.token
  if (accessToken) {
    router.push(redirect)
    return
  }

  const { login } = MkhUI.config.actions
  const tryLogin = () => {
    formRef.value.validate(valid => {
      if (valid) {
        loading.value = true
        login(model)
          .then(data => {
            $notify({
              title: '登录提示',
              message: '登录成功，正在跳转~',
              type: 'success',
              duration: 1500,
              onClose() {
                store.commit('app/token/init', data)
                router.push(redirect)
              },
            })
          })
          .catch(msg => {
            loading.value = false
            $notify.error({
              title: '登录提示',
              duration: 1500,
              message: msg,
            })
          })
      }
    })
  }

  return {
    loading,
    formRef,
    tryLogin,
  }
}
