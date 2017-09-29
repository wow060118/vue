<template>
  <el-row class="tac">
    <el-col :span="18">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 20px;"><h2>商品卡片</h2></span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <img :src="'../../../static/images/'+item[0].product.pic"
                   width="128"
                   height="128"/></el-col>
            <el-col :span="16">
              <div class="grid-content" align="left">产品编号：{{item[0].productid}}</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content" align="left">产品说明：{{item[0].product.descn}}</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content" align="left">产品单价：{{item[0].listprice}}元</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content" align="left">产品数量：
                <input id="colorful" type="number" value="1" min="1" max="10"  ref="quantity"/>
              </div>
            </el-col>
            <el-col :span="24">

              <el-button @click="buy" style="float: right;" type="primary">进入购物车</el-button>


            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style>
  .text {
    font-size: 16px;
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

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>

<script>
  import axios from 'axios'
  import bus from '../../assets/eventBus'
  import Vue from 'vue'
  Vue.prototype.$http = axios
  const PET_QUERY_URL = 'http://localhost:8083/pet/query/'
  const ADD_CART = 'http://localhost:8083/cart/add/'
  export default {
    mounted () { // 加载完比组件 之后立刻执行
      this.init()
    },
    methods: {
      init () {
        this.pid = this.$route.params.pid
        this.iid = this.$route.params.iid
        var that = this
        bus.$on('userSuccessFlag', function (msg) { // 取另个控件的值
          that.username = msg
          alert(that.username)
        })
        this.setlo
        this.$http({
          method: 'POST',
          url: PET_QUERY_URL,
          data: {
            category: '',
            item: that.pid + ':' + that.iid,
            product: '' // 为了对应redis查询
          }
        }).then(function (resp) {
          if (resp.status === 200) { // 登录成功
            that.item = resp.data
          }
        })
          .catch(function (response) {})
      },
      buy () {
        console.log('buy')
        // 看是否登录，才能进入购物车
        this.$router.push({ path: '/cart' })
       // var that = this
        var cart = {
          itemid: this.item[0].itemid,
          orderid: '',
          quantity: this.$refs.quantity.value,
          username: localStorage.getItem('username')
        }
        this.$http({
          method: 'POST',
          url: ADD_CART,
          data: cart
        }).then(function (resp) {
          if (resp.status === 200) { // 增加购物车成功
            console.log(123)
          }
        })
          .catch(function (response) {})
      }
    },
    data () {
      return {
        username: '',
        pid: '',
        iid: '',
        currentDate: new Date(),
        item: [{
          productid: '',
          product: {
            descn: '',
            pic: ''
          },
          listprice: ''
        }]
      }
    }
  }
</script>
