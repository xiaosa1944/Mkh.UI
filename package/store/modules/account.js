//账户信息
const state = {
  /**编号 */
  id: '',
  /**用户名 */
  username: '',
  /**昵称 */
  nickname: '',
  /**头像 */
  avatar: '',
  /** 菜单列表 */
  menus: [],
  /** 权限列表 */
  permissions: [],
  /** 按钮列表 */
  buttons: [],
  /** 皮肤 */
  skin: {
    /** 名称 */
    name: '',
    /**编码 */
    code: '',
    /** 主题 */
    theme: '',
    /** 字号  */
    fontSize: '',
  },
  /**账户详细信息，用于开发者自定义扩展 */
  details: null,
}

const actions = {
  async init({ commit }) {
    //获取账户信息
    const accountInfo = await MkhUI.config.actions.getAccountInfo()

    //初始化皮肤
    if (accountInfo.skin) commit('app/skin/init', accountInfo.skin, { root: true })

    commit('init', accountInfo)
  },
}

const mutations = {
  init(state, info) {
    Object.assign(state, info)
    state.avatar = info.avatar || './images/avatar.png'
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
