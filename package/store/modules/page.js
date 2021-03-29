// 页面信息

const state = {
  /**当前页信息 */
  current: {},
  /**已缓存页面 */
  cached: [],
}

const actions = {
  /**
   * @description 打开页面
   */
  open({ commit }, route) {
    console.log('page:open', route)
  },
}

export default {
  namespaced: true,
  state,
  actions,
}
