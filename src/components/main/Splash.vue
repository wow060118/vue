<template>
  <el-row class="tac">
    <el-col :span="23">

      <el-carousel indicator-position="outside" height="420px">
        <el-carousel-item v-for="item in items" :key="item">
          <img
            :src="item.src" height="100%">
        </el-carousel-item>
      </el-carousel>

    </el-col>
  </el-row>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: './static/images/bird.png',
            text: ''
          },
          {
            src: './static/images/fishs.png',
            text: ''
          },
          {
            src: './static/images/dog.png',
            text: ''
          },
          {
            src: './static/images/cat.png',
            text: ''
          },
          {
            src: './static/images/tortoise.png',
            text: ''
          }
        ]
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
 </script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #005737;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #00456b;
  }
</style>
