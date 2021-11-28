import Vue from 'vue'
import VueRouter from 'vue-router'
// import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Center',
    component: () => import('../views/manager/Center')
  },
  {
    path: '/user',
    name: 'Login',
    component: () => import('../views/user/Login'),
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
  // const userInfo = user.getters.getUser(user.state());
  // console.log(userInfo.user.Authorization);
  // Record the router address of page accessed before user
  // if (to.path === '/login') {
    // localStorage.setItem("preRoute", router.currentRoute.fullPath);
  // }
  // Login is required to access the following pages
  // if (!userInfo) {
  //   next({
  //     name: 'Login',
  //   })
  // }
  next()
})

export default router
