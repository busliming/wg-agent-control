<template>
    <!-- <el-card class="box-card"> -->
       <el-container>
            <el-header style="height: 56px;">
            </el-header>
            <el-main class="main_box">
                <el-container class="sidebar" v-for="item in list" :key="item.label" v-if="item.fileUrl!==''">
                    <el-main class="leftmin">
                        <p class="p1">{{item.fileName}}</p>
                        <p class="p2">支持{{item.supportOs}}以上系统</p>
                        <p class="p3">当前版本{{item.version}}</p>
                        <el-button :class="{andr: item.apkType == 'Android'}" @click="See(item.fileUrl)"></el-button>
                        <!-- <img :src="item.value"> -->
                        <qrcode-vue class="qr-img" :value="item.fileUrl == null ? '/' : item.fileUrl " :size="100"></qrcode-vue>
                    </el-main>
                </el-container>
            </el-main>
        </el-container>     
    <!-- </el-card> -->
</template>
<script>
import qrcodeVue from 'qrcode.vue';
export default {
    data () {
        return { 
            list:[], //二维码
        }
    },
    computed: {
        user () {
            return this.$store.state.user;
        },
    },
    watch: {
        user (n, o) {
            this.gettab();
        }
    },
    components:{
        qrcodeVue
    },
    methods: {
        gettab(){  //获取游戏下载
            let self =this;
            var user = this.user || {};
            let uaccou = user.account
            let ustoke = user.token
            if(user.identity==2){
              uaccou = ''
              ustoke = ''
            }
            self.$http.post('/api/homePage/getSiteDlInfo', {
                "account": uaccou || '',
                "token": ustoke || '',
                })
                .then(function(response) {
                if(response.data.code=='200'){
                    self.list = response.data.data;
                }
            });
        },
        See(value){
            let self =this;
            window.open(value);
        }
    },
    mounted(){
        this.gettab()
    }
}
</script>
<style scoped lang="less">
@import url('../../../resource/css/css.less');
 .el-header{
       border:0 none; 
       .backgrounds(-135px,-286px);
 }
 .main_box{
    background: #503d1c;
    border: solid 1px #916f1e;
    border-top:0 none;
    height:427px;
    .sidebar{
        background:#92701f;
        .leftmin{
                position: relative;
                padding-top:27px;
                .qr-img{
                    position: absolute;
                    right:10px;
                    bottom: 20px;
                    width:100px;
                    background: #fff;
                    padding: 5px 5px 0;
                }
                p{
                    margin:0;
                    padding:0;
                    line-height:30px;
                    font-size:12px;
                    text-shadow: -1px 2px 0px #735718;
                   -moz-text-shadow:-1px 2px 0px #735718; /* 老的 Firefox */
                }
                .p1{
                    color: #fdf3c2;font-weight:900;
                }.p2{
                    color:#fdf3c2;
                }.p3{
                    color: #c7b581;
                }.el-button{
                    width: 112px;
                    height: 34px;
                    .backgrounds(-12px,-42px);
                    border: 0 none;
                    margin-top: 5px;
                }
                .andr{
                    .backgrounds(-145px,-42px);
                } 
        } 
    }
    .sidebar:first-child{
         margin-bottom: 20px;
    } 
}

</style>