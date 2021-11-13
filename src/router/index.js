import Vue from 'vue'
import VueRouter from 'vue-router'
// import user from "@/store/user";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/user',
    name: 'Login',
    component: () => import('../views/user/Login'),
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/messages/Messages'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
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
  // next()
// })

export default router
