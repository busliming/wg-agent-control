<template>
    <div class="recharge">  
        <div class="main-content">                 
            <el-container>
                <div class="lef_nav">
                    <h2>充值</h2>
                    <ul class="on_Line">
                        <ol> <!-- :class="{active:isac==0}" @click="listactiv(0)" -->
                            <i></i>
                            <img src="../../../resource/images/leftnav/xianshang.png">
                        </ol>
                    </ul>
                    <ul class="li_line">
                         <router-link v-for="(item,index) in online" :key="index" tag="li" :class="{active:isac==item.payType}" @click.native="listactiv(item.payType)" 
                            :to="{name:Volume(item.id),params:{pa:item.payType}}">
                            <span>{{item.payName}}</span>
                             <!-- <img :src="BrowsingVolume(item.id)">  -->
                         </router-link>
                    </ul>
                    <ul class="on_Line" v-if="ofProLis">
                        <router-link class="guan" tag="ol" :class="{active:isac==ofProList[0].payType}" @click.native="listactiv(ofProList[0].payType)" 
                        :to="{name:'officialPay',params:{pa:ofProList[0].payType}}">
                            <i></i>
                            <img src="../../../resource/images/leftnav/guan.png">
                        </router-link>
                    </ul>
                    <ul class="on_Line" v-if="ofProLis">
                        <router-link  tag="ol" class="dail" :class="{active:isac==ofProList[1].payType}" @click.native="listactiv(ofProList[1].payType)" 
                          :to="{name:'agentPay',params:{pa:ofProList[1].payType}}">
                            <i></i>
                            <img src="../../../resource/images/leftnav/dail.png">
                        </router-link>
                    </ul>
                </div>
                <el-row id="main-contents">
                    <el-col>
                        <router-view/>  
                    </el-col>
                    <!-- <div class="botton_box">
                        <h4><strong>说明：</strong></h4>
                        <h4><strong>转账到银行卡</strong></h4>
                        <i style="font-size:0.8em; color: ">为了加快财务审核速度，请您完成转账后，再提交订单，如遇到金额未到账等问题，请咨询在线客服。</i> 
                    </div>                   -->
                </el-row>                
            </el-container>
        </div>    
    </div>
</template>

<script>
import menu from '@/config/payTypeMenu'
export default {
    data () {
        return {
            isac:null,
            online:[],
            ofProList:[],
            ofProLis:false,

        }
    },
    methods: {             
       listactiv(i){
           this.isac=i
       },
       Volume(value){
            switch(value){
                case 1: //网银
                return "unionPay";
                case 5: //支付宝
                return "zfbScanCode";
                case 3: //微信
                return "weixinScanCode";
                case 7: //qq钱包
                return "qqWallet";
                case 9:  //银联扫码
                return "unionPayScanCode";
                case 11:  //京东扫码
                return "JDScanCode";
                case 17:  //京东扫码
                return"unionPayExpress"
            }
          },
       payChannel(){
               let self = this 
              this.$http.get('/api/pay/payTypeListAll')
                .then(function(response) {
                       self.online = response.data.data.online
                       self.ofProList=response.data.data.ofProList
                       self.ofProLis=true
                })
       }
    },
    mounted(){
     this.payChannel()
     this.isac=this.$route.params.pa
    },
}
</script>

<style scoped lang="less">
@import url('../../../resource/css/set_nav.less');
.on_Line{
margin-top: 15px;
ol{
    background:url(../../../resource/images/leftnav/kuang1.png) no-repeat;
    height:50px;
    width: 168px;
    margin-left: 23px;
    padding-inline-start: 0;
   i{
    background: url(../../../resource/images/leftnav/icon_1.png) no-repeat;
    width:37px;
    height:37px;
    background-position: 3px 8px;
    display: inline-block;
    margin:6px 0 0 10px;
   }
   img{
    vertical-align: unset;
   }
}
.guan i{
   background: url(../../../resource/images/leftnav/icon_2.png) no-repeat;
   background-position: 3px;
}
.dail i{
   background: url(../../../resource/images/leftnav/icon_3.png) no-repeat;
   background-position: 3px 5px;
}
.active{
    background:url(../../../resource/images/leftnav/kuang0.png) no-repeat;

}
}
.li_line{
    background:url(../../../resource/images/leftnav/biao.png);
    background-repeat: no-repeat;
    background-position: center 0;
    min-height: 436px;
    padding-top: 1px;
    li{
       height: 62px;
       width: 168px;
       margin: 0 auto;
       text-align: center;
       span{
          color: #ffc81f;
          font-size: 18px;
          line-height:60px;
          text-shadow: 0px 6px 6px #504d4d;
       }
    }
    .active{
        background:url(../../../resource/images/leftnav/kuang0.png) no-repeat;
        background-size: 170px 64px;
    }
}
</style>
