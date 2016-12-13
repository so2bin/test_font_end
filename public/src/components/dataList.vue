<template>
    <div id="wrapper">
        <div class="tbl-wraper">
            <table class="tbl">
                <thead>
                    <tr>
                        <th width="20%">url</th>
                        <th width="60%">json</th>
                        <th width="20%">操作</th>
                    </tr>
                </thead>
                
                <tr v-for="d in resArr">
                    <td>{{d.url}}</td>
                    <td>{{d.res}}</td>
                    <td style="text-align:center">
                        <div class="oper">
                            <div v-on:click="onDelRow">删除</div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="res-tips"  v-show="show_tips">
            <div v-bind:style="{color: res_tips_color}">{{res_tips_text}}</div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default{
        data(){
            return{
                res_tips_color: 'red',
                res_tips_text: "",
                resArr: [],
                show_tips: false
            }
        },
        methods:{
            onDelRow: function(e){
                var that = this;
                let row = $(e.target).parents('tr');
                let url = row.find('td').get(0).innerText;
                $.ajax({
                    url:'/list',
                    type:'delete',
                    data: {url: url}
                }).then(function(res){
                    res = JSON.parse(res);
                    if(res.code==0){
                        row.remove();
                        that.res_tips_text = '删除成功';
                        that.res_tips_color= 'green';
                        that.show_tips = true;
                        setTimeout(function(){
                            that.show_tips = false;
                        }, 600);
                    }else{
                        that.res_tips_text = '删除失败';
                        that.res_tips_color = 'red';
                        that.show_tips = true;
                        setTimeout(function(){
                            that.show_tips = false;
                        }, 600);
                    }
                })
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
#res-tips{
    position: absolute;
    top:100px;
    left: 50%;
    font-size: 18px;
    font-weight: 800;
    width: 160px;
    height: 70px;
    line-height: 70px;
    background: #efe4b4;
    text-align: center;
    border-radius: 6px;
}
.tbl{
    margin-top: 50px;
    border-spacing: 0;
    width: 100%;
    border: solid #ccc 1px;
    border-radius: 6px;
    box-shadow: 0 1px 1px #ccc;
}
.tbl tr{
    height: 30px;
    overflow-y: hidden;
}
.tbl tr:hover {  
    background: #fbf8e9;  
    -o-transition: all 0.1s ease-in-out;  
    -webkit-transition: all 0.1s ease-in-out;  
    -moz-transition: all 0.1s ease-in-out;  
    -ms-transition: all 0.1s ease-in-out;  
    transition: all 0.1s ease-in-out;  
}
.tbl td, .tbl th {  
    border-left: 1px solid #ccc;  
    border-top: 1px solid #ccc;  
    padding: 10px;  
    text-align: left;  
}
.tbl th{
    text-align: center;
}
.tbl td:first-child, .tbl th:first-child {  
    border-left: none;  
}  
.tbl th:first-child {  
    -moz-border-radius: 6px 0 0 0;  
    -webkit-border-radius: 6px 0 0 0;  
    border-radius: 6px 0 0 0;  
}
.oper{
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background:#5bb4e4;
    border-radius: 6px;
    text-align: center;
    color: #fff;
}
.oper:active{
    background:#0993de;
    box-shadow: 0 0 10px #0cc;
}
</style>