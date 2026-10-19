import { createRouter, createWebHistory } from 'vue-router'
import GreemoPage from '../pages/GreemoPage.vue'
import NotFound from '../pages/NotFound.vue'
import { pages } from '../utils/pages'

// One route per Greemo page in src/content. Detail pages (kind: detail) use their frontmatter path, e.g. /services/:key.
const routes = [
  ...pages.map(page => ({ path: page.path, name: page.name, component: GreemoPage, props: { pageName: page.name } })),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 100, behavior: 'smooth' }
    return { top: 0 }
  }
})
