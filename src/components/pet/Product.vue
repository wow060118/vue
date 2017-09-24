<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <h2>【{{this.con}}】产品查询</h2>
      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="24">
        <el-table
          :data="products"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="productid"
            label="产品编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="产品名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="descn"
            label="产品描述"
            width="320">
          </el-table-column>
          <el-table-column
            prop="pic"
            label="产品图片">
            <template scope="scope">
              <img :src="'../../../static/images/'+scope.row.pic">
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <router-link :to="{path:'/items/'+scope.row.productid}">
                <el-button type="text" size="small">明细</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const PET_QUERY_URL = 'http://localhost:8083/pet/query/'
  export default {
    watch: {// 路由发生改变
      '$route': 'init'
    },
    mounted () { // 加载完比组件 之后立刻执行
      this.init()
    },
    methods: {
      init () {
        var that = this
        this.con = this.$route.params.id
        this.$http({
          method: 'POST',
          url: PET_QUERY_URL,
          data: {
            category: this.con,
            item: '',
            product: ''
          }
        }).then(function (resp) {
          if (resp.status === 200) {
            that.products = resp.data
          }
        })
          .catch(function (response) {})
      },
      handleClick () {
        console.log(1)
      },
      tableRowClassName (row, index) {
        if (index === 1) {
          return 'info-row'
        } else if (index === 3) {
          return 'positive-row'
        }
        return ''
      }
    },
    data () {
      return {
        con: '',
        products: [{
          productid: '',
          name: '',
          descn: '',
          pic: ''
        }]
      }
    }
  }
</script>
<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }


</style>
