<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <h2>商品查询</h2>
      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="24">
        <el-table
          :data="items"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          </el-table-column>
          <el-table-column
            prop="itemid"
            label="项目编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productid"
            label="产品编号"
            width="220">
          </el-table-column>
          <el-table-column
            prop="product.name"
            label="产品名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="product.descn"
            label="产品描述">
          </el-table-column>
          <el-table-column
            prop="listprice"
            label="单价">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <router-link :to="{path:'/item/'+scope.row.productid+'/'+scope.row.itemid}">
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
        this.pid = this.$route.params.pid
        this.$http({
          method: 'POST',
          url: PET_QUERY_URL,
          data: {
            category: '',
            item: '',
            product: this.pid // 为了对应redis查询
          }
        }).then(function (resp) {
          if (resp.status === 200) {
            that.items = resp.data
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
        items: [{
          itemid: '',
          productid: '',
          product: {
            name: '',
            descn: ''
          },
          listprice: ''
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
