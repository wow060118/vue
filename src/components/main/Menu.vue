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
        <router-link to="pro">
          <el-menu-item index="1-1">小鸟</el-menu-item>
        </router-link>
        <router-link to="pro">
          <el-menu-item index="1-2">小鱼</el-menu-item>
        </router-link>
        <router-link to="pro">
          <el-menu-item index="1-3">小猫</el-menu-item>
        </router-link>
        <router-link to="pro">
          <el-menu-item index="1-4">小狗</el-menu-item>
        </router-link>
        <router-link to="pro">
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
        <el-menu-item index="2-3">注销</el-menu-item>
      </el-submenu>
      <router-link to="cart">
        <el-menu-item index="3"><i class="el-icon-time"></i>我的购物车</el-menu-item>
      </router-link>
    </el-menu>

  </el-row>
</template>
<script>
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
