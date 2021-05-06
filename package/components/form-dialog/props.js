import { loading } from '../../helpers/props'
export default {
  modelValue: Boolean,
  action: {
    type: Function,
    default: null,
  },
  model: {
    type: Object,
    default: null,
  },
  rules: {
    type: Object,
    default: null,
  },
  btnOk: {
    type: Boolean,
    default: true,
  },
  btnOkText: {
    type: String,
    default: '',
  },
  btnReset: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  ...loading,
}
