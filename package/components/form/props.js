import { loading } from '../../helpers/props'
export default {
  action: {
    type: Function,
    default: null,
  },
  /** 标签的宽度 */
  labelWidth: {
    type: String,
    default: '100px',
  },
  /** 自定义验证 */
  customValidate: {
    type: Function,
    default: null,
  },
  /** 不显示加载动画 */
  noLoading: Boolean,
  ...loading,
}
