import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Center',
    component: () => import('../views/manager/Center')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login'),
    meta: {
      noNav: true,
    }
  },
  {
    path: '/apply_detail',
    name: 'Detail',
    component: () => import('../views/manager/Detail'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = user.getters.getUser(user.state());
  // Login is required to access the following pages
  if (!userInfo && to.path !== '/login') {
    next({
      name: 'Login',
    })
  }
  next()
})

export default router
