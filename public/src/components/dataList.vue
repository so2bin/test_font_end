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
.tbl td:first-child, .tbl th:first-child {  
border-left: none;  
}  
  
.tbl th:first-child {  
-moz-border-radius: 6px 0 0 0;  
-webkit-border-radius: 6px 0 0 0;  
border-radius: 6px 0 0 0;  
}    
</style>