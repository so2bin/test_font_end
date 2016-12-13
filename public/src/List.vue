<template>
    <div id="app">
        <div id="nav">
            <navComp></navComp>
        </div>
        <div id="content">
            <dataList></dataList>
        </div>
    </div>
</template>

<script>
import navComp from './components/nav.vue'
import dataList from './components/dataList.vue'
export default {
  name: 'nav',
  data () {
    return {

    }
  },
  components:{
     navComp,
     dataList
  }
}
</script>

<style type="text/css">
html,body{
    height: 100%;
}
#app{
    height: 100%;
}
#nav {
  font-family: '微软雅黑', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 40px;
  background: #eeeeee;
  margin-top: 0px;
}
#content{
  font-family: '微软雅黑', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 80px;
}

</style>
