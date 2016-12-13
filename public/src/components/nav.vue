<template>
    <div class="nav-top">
        <ul class="nav-ul">
            <li><a :href="setting_R">Setting</a></li>
            <li><a :href="list_R">List</a></li>
        </ul>
        <div class="nav-title">
            <h1>前端数据测试</h1>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                setting_R: '/',
                list_R: '/list'
            }
        },
        components:{
        }
    }
</script>
<style>
.nav-ul{
    list-style: none;
}
.nav-ul li{
    display: inline-block;
    width: 100px;
}
.nav-ul a{
    text-decoration:none;
    font-weight: 800;
    line-height: 40px;
    font-size: 18px;
    color: #1384d8;
}
.nav-title{
    text-align: center;
}
</style>