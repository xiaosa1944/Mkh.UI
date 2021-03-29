import db from '../../utils/db'
const key = `token`

export default {
  namespaced: true,
  state: {
    /** 请求令牌 */
    accessToken: '',
    /** 刷新令牌 */
    refreshToken: '',
  },
  mutations: {
    /**
     * 初始化令牌，如果不传则会从本地存储中获取
     */
    init(state, token) {
      if (!token) {
        token = db.get(key)
      }

      if (!token) {
        state.accessToken = token.accessToken
        state.refreshToken = token.refreshToken
      }
    },
    /**
     * 清楚令牌
     */
    clear(state) {
      state.accessToken = ''
      state.refreshToken = ''
      db.remove(key)
    },
  },
}
