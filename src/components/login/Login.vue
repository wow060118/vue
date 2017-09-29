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
          <el-alert v-if="failed"
            :closable="false"
            title="登录失败了！"
            type="error"
            description="你要搞事情，难道你要非法入侵！"
            show-icon>
          </el-alert>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  // import bus from '../../assets/eventBus'
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
        },
        failed: false // 是否显示登录失败提示框
      }
    },
    methods: {
      login (formName) {
        const that = this // 必须这么写，把当前对象 放到thar中 进入到内部函数时 仍然可以使用this
        const user = {
          username: '',
          password: ''
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.failed = false
            // axios ajax的登录
            user.username = this.form1.username
            user.password = this.form1.password
            this.$http({
              method: 'post',
              url: LOGIN_URL,
              data: user
            }).then(function (resp) {
              if (resp.status === 200) { // 登录成功
                // 放入localstorage
                that.$notify({
                  title: '消息',
                  type: 'success',
                  message: user.username + '登录成功！'
                })
                //  bus.$emit('userSuccessFlag', user.username)// login组件和top组件传输
                localStorage.setItem('username', user.username)
                that.$router.push({ path: '/splash' })
              }
            })
            .catch(function (response) {
              that.failed = true
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.failed = false
      }
    }
  }
</script>
