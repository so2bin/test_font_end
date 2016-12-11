<template>
    <div id="wrapper">
        <div id="con-left">
            <div class="tips">url</div>
            <textarea id="url" cols="72" rows="1"></textarea>
            <div class="tips">params</div>
            <textarea id="params" cols="72" rows="30"></textarea>
        </div>
        <div id="con-right">
            <div id="btn-set">配置</div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
<style>
#wrapper{
    margin-left:10px;
    position: relative;
}
#con-left{
    float: left;
}
#con-right{
    position:absolute;
    top:20px;
    right:50px;
}

.tips{
    margin: 10px 0;
    font-weight: 800;
}
#url{
    font-family: "Times New Roman";
    border-radius: 6px;
    font-size: 16px;
    line-height:24px;
    height:24px;
}
#params{
    font-family: "Times New Roman";
    border-radius: 6px;
    font-size: 16px;
    line-height:24px;
}
#btn-set{
    width:100px;
    height:60px;
    line-height:60px;
    font-size:20px;
    font-family:'微软雅黑';
    font-weight:800;
    background-color:#4ccfff;
    text-align:center;
    border-radius: 6px;
}
#btn-set:active{
    box-shadow:0 0 10px #0cc;
}
</style>