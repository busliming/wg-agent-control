<template>
    <el-row>
        <el-col :span="18" :offset="2" finish-status="success" router align-center="true"  style="opacity:0">
            <el-steps :active="active">
                <el-step title="填写充值信息" icon="el-icon-edit" index="officialPay/step1"></el-step>
                <!-- <el-step title="确认充值信息" icon="el-icon-view" index="officialPay/step2"></el-step> -->
                <el-step title="完成" icon="el-icon-success" index="officialPay/step3"></el-step>
            </el-steps>
        </el-col>
        <div class="fluid_box" style="height:650px;">
            <el-col >
                <div v-if="active===1">  
                    <el-col>                
                        <el-col>
                            <step1 ref="headerChild"></step1>                         
                        </el-col>
                        <el-col>
                          <div class="scanbottom">
                              <el-button type="primary" @click="next" :disabled="$store.state.disa">提交</el-button>
                           </div>
                        </el-col>                                   
                    </el-col>            
                </div>
               <!--  <div v-if="active===2">  
                    <el-col>                
                        <el-col>
                            <step2 :inName="step1"></step2>                        
                        </el-col>
                        <el-col>
                            <div class="scanbottom">
                                <el-button @click="back">上一步</el-button>
                                <el-button type="primary" @click="next">提交</el-button>
                            </div>
                        </el-col>                                   
                    </el-col>            
                </div> -->
                <div v-if="active===2">  
                    <el-col>                
                        <el-col>
                            <step3 :ins="names" :nat="naunt"></step3>                       
                        </el-col>
                        <div class="scanbottom">
                            <el-button type="primary" @click="reset">
                                再转一笔
                            </el-button>
                        </div>
                    </el-col>            
                </div>            
            </el-col>
       </div>          
    </el-row>
</template>

<script>
import step1 from './step1'
// import step2 from './step2'
import step3 from './step3'
export default {
    data() {
        return {       
            active: 1,
            names:"",
            naunt:'',
        };
    },

    methods: {
        next() {
             let dats = this.$refs.headerChild.form
             let opt = this.$refs.headerChild.options
             if(dats.value===''){
                this.$Message({
                     message:'请选择收款账户',
                     type: 'warning'
                 });
                return
             }
             if(dats.payer==''){
                this.$Message({
                     message:'请输入付款人姓名',
                     type: 'warning'
                 });
                return
             }
             if(dats.payAmount==''){
                this.$Message({
                     message:'请输入转账金额',
                     type: 'warning'
                 });
                return
             }  else if (parseInt(dats.payAmount) > 1000 || parseInt(dats.payAmount) <10) {
                 this.$Message({
                     message: '充值金额不在；最低充值：10元，最高充值：1000元',
                     type: 'warning'
                 });
                 return;
             }

             if(dats.dateTime==''){
                this.$Message({
                     message:'请选择转账时间',
                     type: 'warning'
                 });
                return;
             }
             if(dats.payMethod==''){
                this.$Message({
                     message:'请选择转方式',
                     type: 'warning'
                 });
                return
             }                  
            let self = this 
            self.$http.post('/api/pay/offlineRecharge',{
                    "account":this.$store.state.user.account, //账号
                    "msgType":"1040",
                    "token":self.$store.state.user.token, 
                    "payMerchantId":opt[dats.value].id,
                    "paySystemId":"",
                    "merchantNo":"",
                    "bankType":opt[dats.value].bankType,
                    "amount":dats.payAmount,
                    "depositorName":dats.payer,
                    "rechargeType":dats.payMethod,
                    "createDate":dats.dateTime,
                    "depositorBank":opt[dats.value].chantName,
                    "siteId":opt[dats.value].siteId,
            })
            .then(function(response) {
                self.names=response.data.data
                self.naunt=dats.payAmount
                if (response.data.code === '200'){
                    self.$Message({
                     message:'操作成功',
                      type: 'success'
                    });
                   if (self.active++ > 2) self.active = 0;
                }else{
                    self.$Message({
                     message:response.data.msg,
                      type: 'success'
                    });
                } 
               


            }) 
        },
        // back() {
        //     this.active--
        // },
        reset() {
            this.active = 1         
        },
    },
    components: {
        step1,
        // step2,
        step3
    }
}
</script>

<style scoped lang="less">
@import url('../../../../resource/css/set_nav.less');
</style>
