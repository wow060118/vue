<template>
  <table border="0" background="../../../static/images/bkg-topbar.gif" width="100%">
    <tbody>
    <tr>
      <td align="left">
        <a href=""><img border="0" width="200"
                        src="../../../static/images/logo-topbar.gif">
        </a>
      </td>
      <td>
        <h2 align="center" style="color: #FFFFFF">欢迎【{{username}}】来到易圣通宠物商店</h2>
      </td>
      <td align="right">
        <router-link to="cart">
          <img border="0" name=img_cart
               src="../../../static/images/cart.gif">
        </router-link>
        <img border="0" src="../../../static/images/separator.gif">
        <router-link to="login"><img border=0 name=img_cart
                                     src="../../../static/images/login.gif">
        </router-link>

        <img border=0 src="../../../static/images/separator.gif">
        <router-link to="reg"><img border=0 name=img_cart
                                   src="../../../static/images/reg.gif">
          <img border=0 src="../../../static/images/separator.gif">
        </router-link>
        <router-link to="init">
          <img border=0 name=img_cart
               src="../../../static/images/init.gif">
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  import bus from '../../assets/eventBus'
  Vue.prototype.$http = axios
//  const GETSESSION_URL = 'http://localhost:8083/user/get/'
  export default {
    watch: { // 监听路由的变化
      // 如果路由有变化，会再次执行该方法000
      '$route' (to, from) {
        this.username = localStorage.getItem('username') == null ? '游客' : '' + localStorage.getItem('username') + ''
      }
    },
    created () { // 组件已经创建完毕 属性已经完毕 dom属性还未生成
      var that = this
      bus.$on('userSuccessFlag', function (msg) {
        that.username = msg
      })
      this.username = localStorage.getItem('username') == null ? '游客' : '' + localStorage.getItem('username') + ''
    },
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        username: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
