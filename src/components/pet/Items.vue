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
          :data="tableData2"
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
            prop="name"
            label="产品名称"
            width="320">
          </el-table-column>
          <el-table-column
            prop="descn"
            label="产品描述">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <router-link to="item">
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
  export default {
    methods: {
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
        tableData2: [{
          itemid: '1',
          productid: '王小虎',
          name: '上海市普陀区金沙江路 1518 弄',
          descn: '王小虎',
          price: '王小虎'
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
