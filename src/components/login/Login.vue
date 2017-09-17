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
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="form1.pass"
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
          pass: [
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
