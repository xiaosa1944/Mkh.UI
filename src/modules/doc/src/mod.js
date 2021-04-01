import pkg from '../package.json'
import { pages, components } from '@mkh-module'

let mod = MkhUI.createModule(pkg)
mod.pages = pages
mod.components = components

MkhUI.useModule(mod)
