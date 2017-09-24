/* eslint-disable eol-last,semi */
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
Vue.use(Router)

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
// 输出router
export default router

