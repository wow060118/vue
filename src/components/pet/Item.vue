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
              <img src="../../../static/images/bird2.jpg"
                                    width="128"
                                    height="128"/></el-col>
            <el-col :span="16"><div class="grid-content" align="left">产品编号：EST-21</div></el-col>
            <el-col :span="16"><div class="grid-content"  align="left">产品说明：这是一条来自北美的鱼</div></el-col>
            <el-col :span="16"><div class="grid-content"  align="left">产品单价：20.90</div></el-col>
            <el-col :span="16">
              <div class="grid-content"  align="left">产品数量：
                <input id="colorful"type="number" value="1" min="1" max="10"/>
              </div>
            </el-col>
            <el-col :span="24">

                <el-button  @click="buy" style="float: right;" type="primary">进入购物车</el-button>


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
 export default {
   methods: {
     buy () {
       console.log('buy')
       this.$router.push('/cart') // 鼠标点击进入某个页
     }
   },
   data () {
     return {
       currentDate: new Date()
     }
   }
 }
</script>
