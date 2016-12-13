<template>
    <div id="wrapper">
        <div id="con-left">
            <div class="tips">url</div>
            <textarea id="url" cols="72" rows="1" v-model="url" placeholder="url such as /D10/realtime"></textarea>
            <div class="tips">result data json</div>
            <textarea id="params" cols="72" rows="30"  v-model="resData" placeholder="data such as {...}"></textarea>
        </div>
        <div id="con-right">
            <div class="btn-set" v-on:click='onSet'>配置</div>
            <div class="btn-set" v-on:click='onSearch'>查询</div>
        </div>
        <div id="res-tips">
            <div v-bind:style="{color: res_tips_color}">{{res_tips_text}}</div>
        </div>
        <div id="help-tips">
            <p class="h-t">配置注意事项:</p>
            1. Setting页面刷新时会初始化一个模板,便于修改;
            <br/>
            2. 数据库里针对每个url保存一份数据,所以确保配置的url唯一;
            <br/>
            3. result data json必须时json格式, 否则无法正确解析;
            <br/>
            <br/>
            <p class="h-t">前端测试接口:</p>
            <span class="h-url">10.17.65.101:8080/test?url=XXX</span> <br/>其中XXX为查询的url值,返回的是url对应的js对象
            <br/>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    // import _ from 'jquery-autocomplete-js'
    export default{
        data(){
            return{
                url:'',
                resData: '',
                res_tips_color: '#eee',
                res_tips_text: ""
            }
        },
        computed: {

        },
        methods:{
            onSet: function(e){
                var that = this;
                var data = {};
                data.url = this.url;
                data.resData = JSON.stringify(this.resData);
                $.ajax({
                    url: '/data',
                    type: 'post',
                    data: data
                }).then(function(res){
                    var re = JSON.parse(res);
                    if(re.code==0){
                        that.res_tips_text = '配置成功';
                        that.res_tips_color= 'green'
                    }else{
                        that.res_tips_text = '配置失败';
                        that.res_tips_color = 'red';
                    }
                });
            },
            onSearch: function(e){
                var that = this;
                var data = {};
                data.url = this.url;
                $.ajax({
                    url: '/data',
                    type: 'get',
                    data: data
                }).then(function(res){
                    var re = JSON.parse(res);
                    if(re.code==0){
                        that.res_tips_text = '查询成功';
                        that.res_tips_color= 'green'
                        that.resData = JSON.stringify(JSON.parse(re.msg[0].res), null, 4);
                    }else{
                        that.res_tips_text = '查询出错';
                        that.res_tips_color = 'red';
                    }
                });
            }
        },
        created: function(){
            let that = this;
            $.getJSON('/config/test_front_end_template.json', function(data){
                that.url = data.url;
                that.resData = data.data;
            });
            // init  the url input the auto complete
            // $('#url').autocomplete({
            //     options:['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']
            // })
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
#res-tips{
    position:absolute;
    top:100px;
    right:50px;
    /*background: #eee;*/
    width:240px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 20px;
    border-radius: 6px;
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
    line-height:20px;
}
.btn-set{
    display: inline-block;
    margin-right:20px;
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
.btn-set:active{
    box-shadow:0 0 10px #0cc;
}
#help-tips{
    position:absolute;
    top:200px;
    right:50px;
    width:360px;
}
.h-t{
    font-weight:700;
    font-size:16px;
}
.h-url{
    color:red;
}
</style>