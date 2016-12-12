<template>
    <div id="wrapper">
        <div class="tbl-wraper">
            <table class="tbl">
                <tr>
                    <th>url</th>
                    <th>json</th>
                    <th>操作</th>
                </tr>
                <tr  v-for="d in resArr">
                    <td>{{d.url}}</td>
                    <td>{{d.res}}</td>
                    <td>oper</td>
                </tr>
            </table>
        </div>
        <div id="res-tips">
            <div v-bind:style="{color: res_tips_color}">{{res_tips_text}}</div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default{
        data(){
            return{
                res_tips_color: '#eee',
                res_tips_text: "",
                resArr: []
            }
        },
        created: function(){
            let that = this;
            $.ajax({
                url:'/data',
                type: 'get',
            }).then(function(res){
                let reObj = JSON.parse(res);
                that.resArr = reObj.msg;
            })
        }
    }
</script>

<style>
#wrapper{
    margin-left:10px;
    position: relative;
}
.tbl{
    border: 1px;
}
</style>