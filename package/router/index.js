import { createRouter, createWebHashHistory } from 'vue-router'

let router = null

export default app => {
  router = createRouter({
    history: createWebHashHistory(),
    routes: [],
  })
}

export { router }
