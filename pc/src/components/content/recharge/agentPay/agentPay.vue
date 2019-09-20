<template>
    <div class="container-fluid">
        <div class="fluid_box">
            <h2>代理充值</h2>
            <div class="Avatar">
                <img src="../../../../resource/images/tu.png">
            </div>
            <div class="select">
                 选择代理
            </div>
            <div class="select_tab">
                 <el-button-group>
                    <el-button type="primary" plain :class="{active:uotp==0}" @click="uptab(0)">
                         <!-- <p>微信昵称：rica</p> -->
                         <p>{{datazf.type == '1' ? 'QQ':'微信'}}账号：{{datazf.account}}</p>
                    </el-button>
                   <!--  <el-button type="primary" plain :class="{active:uotp==1}" @click="uptab(1)">
                         <p>微信昵称：rica</p>
                         <p>微信账号：99854</p>
                    </el-button>
                    <el-button type="primary" plain :class="{active:uotp==2}" @click="uptab(2)">
                         <p>微信昵称：rica</p>
                         <p>微信账号：99854</p>
                    </el-button> -->
                </el-button-group>
            </div>
            <div class="scanbottom">
                <el-button>
                    举报代理
                </el-button>
            </div>
        </div>     
    </div>
</template>
<script>
export default {
    data () {
        return {
            uotp:0,
            datazf:{}
        }
    },
    methods: {
            prsubmit(){
                  let self = this 
                self.$http.post('/api/userProfile/getReportInfo')
                .then(function(response) {
                    if(response.data.code=='200'){
                      self.datazf=response.data.data
                    }
                })
          },             
           uptab(i){
               this.uotp=i
           }
    },
    mounted(){
        this.prsubmit()
    }
}
</script>
<style scoped lang="less">
   @widths:568px;
.fluid_box{
    width: 810px;
    height:600px;
    background:rgba(41,35,23,0.15);
    border-radius:10px;
    margin:38px auto 10px;
    -webkit-box-shadow: 5px 5px 10px #817452;
    -moz-box-shadow: 5px 5px 10px #817452;
    box-shadow: 5px 5px 10px #817452;
    h2{
    color: #ffcd13;
    font-weight:400;
    width: 715px;
    height:80px;
    text-align:center;
    margin:0 auto;
    line-height:80px;
    font-size:32px;
    border-bottom: solid 1px #533c12;
    text-shadow: black 0.1em 0.1em 0.2em
   }
   .Avatar{
    width:@widths;
    height:204px;
    margin:38px auto 0;
    background:url(../../../../resource/images/leftnav/kuangk.png) no-repeat;
        >img{
            margin:0 auto ;
            display: block;
            padding-top: 25px;
        }
    }
    .select{
        width:@widths;
        height:49px;
        margin:13px auto 0;
        background:url(../../../../resource/images/leftnav/changk.png) no-repeat;
        text-align: center;
        line-height: 49px;
        font-size:22px;
        font-weight:400;
        text-shadow: black 0.1em 0.1em 0.4em;
        color: #ffd413;

    }
    .select_tab{
        width:@widths;
        margin:18px auto 0;
        .el-button-group{
            width: 100%;
            display: block;
            text-align: center;
            .el-button{
                width:calc(100% / 3 - 12px );
                padding: 0;
                background:url(../../../../resource/images/leftnav/zhangk2.png) no-repeat;
                border: 0 none;
                height: 73px;
                color: #f8eb00;
                float: none;
            }
            .el-button:nth-child(2){
                 margin: 0 18px;
            }
            .el-button.active{
                background:url(../../../../resource/images/leftnav/zhangk.png) no-repeat;
            }
        }
    }
    .scanbottom{
        width:@widths;
        margin:21px auto 0;
        .el-button{
          background:url(../../../../resource/images/leftnav/juk.png) no-repeat; 
          width: 126px;
          height:48px;
          border: 0 none;
          float: right;   
          color: #5e3f2b;
          font-size:18px;
          font-weight: 600;
        }

    }
}
</style>