import { creatModule } from '../../../../package/index'
import pkg from '../package.json'
import routes from './routes'

let mod = creatModule(pkg)
mod.routes = routes

export default mod
