import Vue from 'vue'
import App from './App'
import router from './router/router.js'    // 这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
/* eslint-disable no-new */
// 必须这么声明，使用路由
new Vue({
  el: '#app',    // 这里绑定的是index.html中的id为app的div元素
  router,
  render: h => h(App)// 必须es6写法，否则出现mathch找不到错误，执行App组件

  // 这里的render: h => h(App)是es6的写法
  // 转换过来就是：  暂且可理解为是渲染App组件
  // render:(function(h){
  // return h(App);
  // });

})
