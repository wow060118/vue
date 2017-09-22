<template>
  <el-row class="tac">
    <el-col :span="10">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px"><b>用户登录</b></span>
        </div>
        <div class="text item">
          <el-form :model="form1" :rules="rules2" ref="form1"
                   label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="form1.username"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form1.password"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login('form1')">提交</el-button>
              <el-button @click="resetForm('form1')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const LOGIN_URL = 'http://localhost:8083/user/login/'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名！'))
        } else {
          callback()
        }
      }
      return {
        form1: {
          username: '',
          password: ''
        },
        rules2: {
          password: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          username: [
            {validator: validateUsername, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login (formName) {
        // var that = this
        this.$refs[formName].validate((valid) => {
          const user = {
            username: '',
            password: ''
          }
          user.username = this.form1.username
          user.password = this.form1.password
          if (valid) {
            // alert(user.username)
            this.$http({
              method: 'POST',
              url: LOGIN_URL, // + user.username + '/' + user.password + '/'
              data: {
                username: 'weikun',
                pasword: '119'
              }
            }).then(function (resp) {
              if (resp.status === 200) {
                console.log('success!')
              }
            })
              .catch(function (resp) {
                console.log('errorQQQ')
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
