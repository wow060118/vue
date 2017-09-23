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
    watch: { // 监听路由变化
      '$route' (to, from) {
        var that = this
        bus.$on('userSuccessFlag', function (msg) { // 取另个控件的值
          that.username = msg
//          that.$http({
//            method: 'GET',
//            url: GETSESSION_URL
//          }).then(function (resp) {
//            if (resp.status === 200) { // 取session成功
//              that.username = resp.data
//            }
//          })
//            .catch(function (response) {
//              that.failed = true
//            })
        })
      }
    },
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        username: '游客'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
