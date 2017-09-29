<template>
  <el-row class="tac">
    <el-menu theme="dark"
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-star-on"></i>宠物店
        </template>
        <router-link :to="{path:'/pro/BIRDS'}">
          <el-menu-item index="1-1">小鸟</el-menu-item>
        </router-link>
        <router-link :to="{path:'/pro/FISH'}">
          <el-menu-item index="1-2">小鱼</el-menu-item>
        </router-link>
        <router-link :to="{path:'/pro/CATS'}">
          <el-menu-item index="1-3">小猫</el-menu-item>
        </router-link>
        <router-link :to="{path:'/pro/DOGS'}">
          <el-menu-item index="1-4">小狗</el-menu-item>
        </router-link>
        <router-link :to="{path:'/pro/REPTILES'}">
          <el-menu-item index="1-5">小龟</el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>用户管理
        </template>
        <router-link to="login">
          <el-menu-item index="2-1">登录</el-menu-item>
        </router-link>
        <router-link to="reg">
          <el-menu-item index="2-2">注册</el-menu-item>
        </router-link>

          <el-menu-item index="2-3" @click="logout">注销</el-menu-item>

      </el-submenu>
      <router-link to="cart">
        <el-menu-item index="3"><i class="el-icon-time"></i>我的购物车</el-menu-item>
      </router-link>
    </el-menu>

  </el-row>
</template>
<script>
  import bus from '../../assets/eventBus'
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const LOGOUT_URL = 'http://localhost:8083/user/logout/'
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      logout () {
        var that = this
        localStorage.removeItem('username')
        this.$http({
          method: 'GET',
          url: LOGOUT_URL
        }).then(function (resp) {
          if (resp.status === 200) {
            that.$notify({ // 放入localstorage
              title: '消息',
              type: 'success',
              message: '系统已经注销！'
            })
            bus.$emit('userSuccessFlag', '游客')// login组件和top组件传输, 防止在splash点击logout时，会没有反应
            that.$router.push({ path: '/splash' })
          }
        })
          .catch(function (response) {
            that.failed = true
          })
      }
    }
  }
</script>
