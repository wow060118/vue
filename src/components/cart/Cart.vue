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
            prop="descn"
            label="产品描述"
            width="260">
          </el-table-column>
          <el-table-column
            width="170"
            prop="pic"
            label="产品照片">
          </el-table-column>
          <el-table-column
            width="100"
            prop="listprice"
            label="单价">
          </el-table-column>
          <el-table-column
            width="90"
            prop="quantity"
            label="数量">
          </el-table-column>
          <el-table-column
            width="160"
            prop="sum"
            label="合计">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <router-link :to="{path:'/../../item/'+scope.row.productid+'/'+scope.row.itemid}">
                <el-button type="text" size="small">明细</el-button>
              </router-link>
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

        <h3>总计:199元</h3>
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
  export default {
    methods: {
      handleClick () {
        console.log(1)
      },
      checkout () {
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
        carts: [{
          itemid: 'EST',
          productid: 'p_001',
          descn: '上海市普陀区金沙江路 1518 弄',
          pic: '王小虎',
          listprice: '20',
          quantity: '8',
          sum: '666'
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
