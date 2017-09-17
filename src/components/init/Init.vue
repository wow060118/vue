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
      <el-button type="danger" @click="init">初始化数据，谨慎使用</el-button>
    </el-col>
    <el-col :span="2">

    </el-col>
  </el-row>

</template>
<script>
  export default {
    methods: {
      init () {
        console.log('init')
      }
    },
    data () {
      return {
        per: 60
      }
    }
  }
</script>
<style>
</style>
