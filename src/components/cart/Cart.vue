<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <h2>我的购物车</h2>
      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="24">
        <el-table
          :data="carts"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          </el-table-column>
          <el-table-column
            prop="itemid"
            label="商品编号"
            width="115">
          </el-table-column>
          <el-table-column
            prop="productid"
            label="产品编号"
            width="110">
          </el-table-column>
          <el-table-column
            prop="item.product.descn"
            label="产品描述"
            width="260">
          </el-table-column>
          <el-table-column
            width="170"

            label="产品照片">
            <template scope="scope">
              <img :src="'../../../static/images/'+scope.row.item.product.pic">
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="item.listprice"
            label="单价">
          </el-table-column>
          <el-table-column
            width="90"
            prop="quantity"
            label="数量">
            <template scope="scope">
              <input type="number" :value="scope.row.quantity" v-model="carts[scope.$index].quantity"
                     min="1" max="10" @change="change(scope.row,scope.$index)"/>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            label="合计">
            <template scope="scope">
              {{scope.row.item.listprice*scope.row.quantity}}元
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="tac">

      <el-col :span="24" align="right">
        <br/>
        <hr/>
      </el-col>

    </el-row>
    <el-row class="tac">
      <el-col :span="1" align="right">

      </el-col>
      <el-col :span="20" align="right">

        <h3>总计: {{total}}元</h3>
      </el-col>
      <el-col :span="3" align="right">

      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="1" align="right">
        <h3><el-button type="primary" @click="checkout">结账</el-button></h3>
      </el-col>
      <el-col :span="23" align="right">

      </el-col>

    </el-row>

  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const QUERY_CART_URL = 'http://localhost:8083/cart/query/'
  const DEL_CART_URL = 'http://localhost:8083/cart/del/'
  const UPDATE_CART_URL = 'http://localhost:8083/cart/update/'
  const CHECK_OUT = 'http://localhost:8083/cart/checkout/'
  export default {
    mounted () {
      this.init()
    },
    methods: {
      change (row, index) {
        this.cart.username = localStorage.getItem('username')
        this.cart.orderid = row.orderid
        this.cart.itemid = row.item.itemid
        this.cart.productid = row.item.product.productid
        console.log(this.carts[index].quantity)
        this.cart.quantity = this.carts[index].quantity
        const that = this
        this.$http({
          method: 'put',
          data: that.cart,
          url: UPDATE_CART_URL
        }).then(function (resp) {
          if (resp.status === 200) {
            console.log(resp.data)
            that.carts = resp.data
            that.comTotal()
          }
        })
          .catch(function (response) {
            console.log('error')
          })
      },
      del (row) {
        const that = this
        this.$http({
          method: 'delete',
          url: DEL_CART_URL + row.orderid + '/' + row.username + '/' + row.itemid + '/' + row.productid + '/'
        }).then(function (resp) {
          if (resp.status === 200) {
            console.log(resp.data)
            that.carts = resp.data
            that.comTotal()
          }
        })
          .catch(function (response) {
            console.log('error')
          })
      },
      comTotal () { // 计算总计
        var sum = 0
        for (var i in this.carts) {
          sum += this.carts[i].item.listprice * this.carts[i].quantity
        }
        this.total = sum
      },
      init () {
        const that = this
        const username = localStorage.getItem('username')
        this.$http({
          method: 'get',
          url: QUERY_CART_URL + username + '/'
        }).then(function (resp) {
          if (resp.status === 200) {
            console.log(resp.data)
            that.carts = resp.data
            that.comTotal()
          }
        })
          .catch(function (response) {
            console.log('error')
          })
      },
      handleClick () {
        console.log(1)
      },
      checkout () {
        this.orders.orderid = this.carts[0].orderid
        this.orders.username = localStorage.getItem('username')
        this.orders.totalprice = this.total
        this.$http({
          method: 'post',
          data: this.orders,
          url: CHECK_OUT
        }).then(function (resp) {
          if (resp.status === 200) {
            console.log(resp.data)
          }
        })
          .catch(function (response) {
            console.log('error')
          })
        this.$router.push('/')
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
        total: 0,
        orders: {
          orderid: '',
          username: '',
          totalprice: ''
        },
        cart: {
          quantity: '',
          username: '',
          item: {
            itemid: '',
            productid: ''
          },
          orderid: ''
        },
        carts: [{
          item: {
            itemid: '',
            listprice: '',
            product: {
              productid: '',
              descn: '',
              pic: ''
            }
          },
          itemid: '',
          productid: '',
          orderid: '',
          quantity: '',
          username: '',
          sum: ''
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
