<template>
  <el-row class="tac">
    <el-col :span="2">
      <div>&nbsp;&nbsp;</div>
    </el-col>

    <el-col :span="20">
      <h2>初始化数据</h2>
      <el-progress :text-inside="true" :stroke-width="18"
                   :percentage="per" status="success"></el-progress>
      <br/>
      <el-button type="danger" @click="open">初始化数据，谨慎使用,成功后，需要重启猫</el-button>
    </el-col>
    <el-col :span="2">

    </el-col>
  </el-row>

</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const INIT_URL = 'http://localhost:8083/init/init/'
  export default {
    methods: {
      init () {
        this.$http({
          method: 'GET',
          url: INIT_URL
        }).then(function (resp) {
          if (resp.status === 200) {}
        })
          .catch(function (resp) {
            console.log('error')
          })
      },
      open () {
        var that = this
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.init()
//          for (var i = 1; i <= 1000; i++) { // 科里化，对i进行值得锁定
//            (function (i) {
//              setTimeout(function () {
//                that.per = i / 10
//              }, 1000)
//            })(i)
//            if (i === 1000) {
//              this.$router.push({path: '/splash'})
//            }
//          }
          var perround = setInterval(function () {
            that.per = that.per + 1
            if (that.per === 100) {
              clearInterval(perround)
              that.$router.push({path: '/splash'})
            }
          }, Math.random() * 50)
          this.$message({
            type: 'success',
            message: '初始化成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    data () {
      return {
        per: 0
      }
    }
  }
</script>
<style>
</style>
