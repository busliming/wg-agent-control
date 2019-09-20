<template>
    <div class="container-fluid">
       <div class="fluid_box">
            <h2><img :src="datazf.payIcon"></h2>
            <!-- <div class="Avatar">
                <img :src="datazf.payIcon">
            </div>   -->  
            <el-row style="padding-top:60px;">
                <el-col :span="8">
                    <span class="input-label right">充值金额：</span>
                </el-col> 
                <el-col :span="8">
                    <el-input placeholder="请输入" v-model="Amount"  id="Amount"></el-input> 
                </el-col>
                <el-col :offset="8" :span="8" v-if="maxQuota==''? false:true">
                    <i class="input-notice left">单笔限制{{minQuota}}-{{maxQuota}}元</i> 
                </el-col>   
            </el-row>
            <el-row>                              
                <div class="select_tab">
                     <el-button-group>
                        <el-button v-for="(itme,index) in datazf.payChannel" :key="itme.id" type="primary" plain :class="{active:uotp==index}" 
                              @click="uptab(index,itme.minQuota,itme.maxQuota)">
                             <p>渠道{{index+1}}</p>
                        </el-button>
                    </el-button-group>
                </div>         
                <div class="scanbottom">
                    <el-button type="primary" @click="submit()">
                        提交
                    </el-button>
                </div>
            </el-row>
       </div>                      
         <form id="payform" action="http://payment.leyingpaysys.com/payment_platform/form/toForm" method="POST" target="_blank">
    
            <input type="hidden" name="domain" id="domain" v-model="potform.domain">
          
            <input type="hidden" name="paySendType" id="paySendType" v-model="potform.paySendType">
          
            <input type="hidden" name="paymentBankType" id="paymentBankType" v-model="potform.paymentBankType">
          
            <input type="hidden" name="paymentData" id="paymentData" v-model="potform.paymentData">
          
            <input type="hidden" name="paymentOrderNumber" id="paymentOrderNumber" v-model="potform.paymentOrderNumber">

            <input type="hidden" name="paymentPayName" id="paymentPayName" v-model="potform.paymentPayName">
          
            <input type="hidden" name="paymentResType" id="paymentResType" v-model="potform.paymentResType">
          
            <input type="hidden" name="paymentSendUrl" id="paymentSendUrl" v-model="potform.paymentSendUrl">
          
            <input type="hidden" name="paymoney" id="paymoney" v-model="potform.paymoney"> 
        </form>  

    </div>
</template>



<script>
export default {
    data () {
        return {
          Amount:'',
          uotp:null,
          maxQuota:'',
          minQuota:'',
          datazf:[],
          potform:[]
        }
    },
    methods: {             
          prsubmit(){
                  let self = this 
                self.$http.post('/api/pay/payChannel',{
                       "account":this.$store.state.user.account, //账号
                       "payType":this.$route.params.pa,
                })
                .then(function(response) {
                    if(response.data.code=='200'){
                      self.datazf=response.data.data
                    }
                })
          },
          uptab(i,min,max){
            this.maxQuota=max
            this.minQuota=min
            this.uotp=i
          },
          submit(){
              let statex = this.isin(); 
              if(!statex){
                  return;
              };
              let self = this
              var form1=document.getElementById("payform"); 
              function pro () {
                 return new Promise((resolve, reject)=>{
                      self.$http.post('/api/pay/toPayDataSplicing',{
                              "account":self.$store.state.user.account, //账号
                               "amount":self.Amount,
                               "bankType":self.datazf.payChannel[self.uotp].payType,
                               "ip": "127.0.0.1",
                              "mobile": "",
                              "payMerchantId":self.datazf.payChannel[self.uotp].id,
                              "paySystemId":self.datazf.payChannel[self.uotp].paySystemId,
                              "siteId":self.datazf.payChannel[self.uotp].siteId
                      })
                      .then(response => {
                        self.potform=response.data.data
                        resolve(response.data.data)
                      })
                  })
              }   
              pro().then(() => {
                  form1.submit();
              })
          },
          isin(){
            let am=parseFloat(this.Amount)
            let max=parseFloat(this.maxQuota)
            let min=parseFloat(this.minQuota)
               if(this.maxQuota==''){
                 this.$Message({
                     message:'请选择充值通道',
                     type: 'warning'
                 });
                 return false
                }
               if(this.Amount==''){
                  this.$Message({
                       message:'金额不能为空',
                       type: 'warning'
                   });
                  return false
               }
               if(am > max){
                  this.$Message({
                       message:'该通道最大充值不能超过'+this.maxQuota,
                       type: 'warning'
                   });
                  return false
               }
               if(am < min){
                  this.$Message({
                       message:'该通道最小充值不能超过'+this.minQuota,
                       type: 'warning'
                   });
                  return false
               }
             return true
          }
    },
    mounted(){
        this.prsubmit()
    }
}
</script>

<style scoped lang="less">
@import url('../../../../resource/css/set_nav.less');
</style>
<style type="text/css">
#Amount.el-input__inner{
  background:0 none;
  border:0 none;
  height:50px;
  line-height:50px;
  color: #fec81e;
  font-size:20px;
}

</style>