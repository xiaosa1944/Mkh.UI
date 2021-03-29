import Breadcrumb from './breadcrumb/index.vue'
import Container from './container/index.vue'
import FlexColumn from './flex-column/index.vue'
import FlexRow from './flex-row/index.vue'
import Icon from './icon/index.vue'
import LoginM from './login-m/index.vue'
import Menu from './menu/index.vue'
import Scrollbar from './scrollbar/index.vue'
import ToolbarFullscreen from './toolbars/fullscreen.vue'

const components = [Breadcrumb, Container, FlexColumn, FlexRow, Icon, LoginM, Menu, Scrollbar, ToolbarFullscreen]

export default app => {
  components.forEach(m => {
    app.component(`Mu${m.name}`, m)
  })
}
