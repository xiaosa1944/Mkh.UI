import Box from './box/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Button from './button/index.vue'
import Container from './container/index.vue'
import FlexColumn from './flex-column/index.vue'
import FlexRow from './flex-row/index.vue'
import Icon from './icon/index.vue'
import LoginH from './login-h/index.vue'
import LoginK from './login-k/index.vue'
import LoginM from './login-m/index.vue'
import Menu from './menu/index.vue'
import Scrollbar from './scrollbar/index.vue'
import ToolbarFullscreen from './toolbar-fullscreen/index.vue'
import ToolbarSkin from './toolbar-skin/index.vue'
import VerifycodeInput from './verifycode-input/index.vue'

const components = [Box, Breadcrumb, Button, Container, FlexColumn, FlexRow, Icon, LoginH, LoginK, LoginM, Menu, Scrollbar, ToolbarFullscreen, ToolbarSkin, VerifycodeInput]

export default app => {
  components.forEach(m => {
    app.component(`Mu${m.name}`, m)
  })
}
