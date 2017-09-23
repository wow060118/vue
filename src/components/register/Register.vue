<template>
  <el-row class="tac">
    <el-col :span="18">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px"><b>注册新用户</b></span>
        </div>
        <div class="text item">
          <el-form :model="form1" :rules="rules2" ref="form1"
                   label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="form1.username"
                        auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="form1.pass"
                        auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form1.checkPass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="form1.email" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="xm">
              <el-input type="text" v-model="form1.xm" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input type="text" v-model="form1.address" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="母语" prop="lang">
              <el-select v-model="form1.lang" placeholder="请选择你的母语">
                <el-option label="英语" value="english"></el-option>
                <el-option label="中文" value="chinese"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="喜欢的宠物" prop="cate">
              <el-select v-model="form1.cate" placeholder="请选择宠物">
                <el-option v-for="o in cates" :value="o.catid" :key="o.catid" :label="o.name">
                  {{o.name}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form1')">提交</el-button>
              <el-button @click="resetForm('form1')">重置</el-button>
            </el-form-item>
          </el-form>
          <el-alert v-if="failed"
                    :closable="false"
                    title="注册失败了！"
                    type="error"
                    description="你真蠢！"
                    show-icon>
          </el-alert>
        </div>
      </el-card>

      </el-card>
    </el-col>
  </el-row>

</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const QUERY_CATEGORY_ALL = 'http://localhost:8083/user/category/'
  const REG_URL = 'http://localhost:8083/user/reg/'
  export default {
    mounted () { // 挂载之后执行
      this.queryCategory()
    },
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
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form1.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else { // 验证邮箱格式
          var emailRE = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
          if (!emailRE.test(value)) {
            callback(new Error('邮箱格式错误！'))
          } else {
            callback()
          }
        }
      }
      var validateXm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入你的姓名'))
        } else {
          callback()
        }
      }
      var validateLang = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择你的母语'))
        } else {
          callback()
        }
      }
      var validateCate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择你喜爱的宠物'))
        } else {
          callback()
        }
      }
      return {
        failed: false,
        cates: [],
        form1: {
          username: '',
          pass: '',
          checkPass: '',
          email: '',
          xm: '',
          address: '',
          lang: '',
          cate: ''
        },
        rules2: {// 判断规则
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          checkPass: [
            { validator: validatePass2, required: true, trigger: 'blur' }
          ],
          username: [
            {validator: validateUsername, required: true, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, required: true, trigger: 'blur'}
          ],
          xm: [
            {validator: validateXm, required: true, trigger: 'blur'}
          ],
          lang: [
            {validator: validateLang, required: true, trigger: 'change'}
          ],
          cate: [
            {validator: validateCate, required: true, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      queryCategory () {
        var that = this
        this.$http({
          method: 'GET',
          url: QUERY_CATEGORY_ALL
        }).then(function (resp) {
          if (resp.status === 200) { // 登录成功
            that.cates = resp.data
          }
        })
          .catch(function (response) {
            that.failed = true
          })
      },
      submitForm (formName) {
        var that = this
        const user = {
          username: that.form1.username,
          password: that.form1.pass,
          email: that.form1.email,
          xm: that.form1.xm,
          address: that.form1.address,
          profile: {
            username: that.form1.username,
            catid: that.form1.cate,
            lang: that.form1.lang
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http({
              method: 'POST',
              url: REG_URL,
              data: user
            }).then(function (resp) {
              if (resp.status === 200) {
                console.log(resp.status)
                that.failed = false
                that.$notify({
                  title: '成功',
                  message: '注册成功！',
                  type: 'success'
                })
                that.$router.push({ path: '/login' })
              }
            })
              .catch(function (response) {})
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
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
