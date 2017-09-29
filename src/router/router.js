/* eslint-disable eol-last,semi */
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/Login.vue'
import Register from '../components/register/Register.vue'
import Splash from '../components/main/Splash.vue'
import Product from '../components/pet/Product.vue'
import Items from '../components/pet/Items.vue'
import Item from '../components/pet/Item.vue'
import Cart from '../components/cart/Cart.vue'
import Init from '../components/init/Init.vue'
// Vue.prototype.$http = axios
Vue.use(Router)
const GETSESSION_URL = 'http://localhost:8083/user/get/'
const router = new Router({
  routes: [
    {
      path: '/splash', component: Splash
    },
    {
      path: '/login', component: Login
    },
    {
      path: '/reg', component: Register
    },
    {
      path: '/pro/:id', component: Product
    },
    {
      path: '/items/:pid', component: Items
    },
    {
      path: '/item/:pid/:iid', component: Item
    },
    {
      path: '/cart', component: Cart
    },
    {
      path: '/init', component: Init
    },
    {
      path: '*', redirect: '/splash'
    }
  ]
})

router.beforeEach(({ meta, path }, from, next) => {
  if (path !== 'login') {
    axios({
      method: 'GET',
      url: GETSESSION_URL
    }).then(function (resp) {
      if (resp.status === 200) {
        next()
      }
    })
      .catch(function (response) {
        if (path.toString().indexOf('init') > 0 || path.toString().indexOf('cart') > 0) {
          return next({ path: '/login' })
        }
      })
    next()
  }
})

// 输出router
export default router

