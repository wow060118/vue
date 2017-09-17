<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <Top></Top>
        </div>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <Menu></Menu>
        </div>
      </el-col>
      <el-col :span="20" align="center">
        <div class="grid-content bg-purple">
            <router-view><!--路由显示的组件-->

            </router-view>
        </div>
      </el-col>
    </el-row>
  </div>


</template>
<script>
  import Top from './Top.vue'
  import Menu from './Menu.vue'

  export default {
    name: 'app',
    components: {
      Top,
      Menu
    }
  }
</script>
<style>
  .bg-purple {
    background: #FFFFFF;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }
</style>

