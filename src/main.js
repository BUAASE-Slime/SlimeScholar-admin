import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import user from "./store/user";
import da from "element-ui/src/locale/lang/da";

Vue.config.productionTip = false

// mount axios globally
Vue.prototype.$axios = axios;

// read data from public/global.json and mount it globally
axios.get('/global.json').then((data) => {
  Vue.prototype.GLOBAL = data.data;
  console.log(data.data);
  axios.defaults.baseURL = data.data.backUrl;
})

// add token into headers
axios.interceptors.request.use(
    config => {
      const userInfo = user.getters.getUser(user.state());
      if (userInfo) {
        config.headers.Authorization = userInfo.user.Authorization;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// element UI
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
