<template>
    <div name="step1" id="step1">
            <h2>官方充值</h2>
            <el-form ref="form" :model="form" label-width="30%"  class="stepform"> 
                <div style="min-height:80px;" v-if='mintop'>
                        <el-form-item label="收款人姓名：" style="margin:0;" v-if="reversedMessage < 30">
                           <p>{{ options[form.value].ower }}</p>                 
                        </el-form-item>
                        <el-form-item label="收款人开户行：" style="margin:0;" v-if="reversedMessage < 30">  <!-- v-if="form.payMethod==1" -->
                           <p >{{options[form.value].bankAccount}}</p>                 
                        </el-form-item>
                        <div class="smewm" v-if="reversedMessage > 30">
                              <img src="../../../../resource/images/ioserweima.png">
                              <p  style="margin:0 0 10px 0;">有效期两分钟,请尽快完成</p>
                        </div>
                </div>
                <el-form-item label="选择收款账户：">
                    <el-select v-model="form.value"  placeholder="请选择收款账户" id="select">
                         <el-option
                          v-for="(item,index) in options"
                          :key="item.value"
                          :label="item.chantName + '     ' + item.chantAccount"
                          :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="付款人姓名：">
                    <el-input v-model="form.payer" placeholder="请输入"></el-input>           
                </el-form-item>
                <!-- <el-form-item label="选择收款人银行：" v-if="form.payMethod==1">
                    <el-select v-model="form.payeeBank" placeholder="请选择">
                        <el-option label="银行1" value="1"></el-option>
                        <el-option label="银行2" value="2"></el-option>
                    </el-select>               
                </el-form-item> -->
                <el-form-item label="转账金额：">
                    <el-input v-model="form.payAmount" placeholder="请输入">
                    </el-input>           
                </el-form-item>
                <el-form-item label="转账时间：">
                    <el-date-picker v-model="form.dateTime" type="datetime" default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="转账方式：">
                    <el-select v-model="form.payMethod" placeholder="请选择">
                        <el-option label="ATM柜员机" value="1"></el-option>
                        <el-option label="ATM现金" value="2"></el-option>
                        <el-option label="银行柜台" value="3"></el-option>
                        <el-option label="手机银行转账" value="4"></el-option>
                        <el-option label="网银转账" value="5"></el-option>
                        <el-option label="其他" value="6"></el-option>
                    </el-select>
                </el-form-item>                 
            </el-form>      
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    payerBank: '', //付款银行
                    payer: '',  //付款人姓名
                    payeeBank: '', //开户银行
                    payeeBranch:'', //这是显示收款户行地名
                    payee:'',      //这是显示收款户名字
                    payAmount: '', //转账金额
                    dateTime: '', //这是时间
                    payMethod:'', //这是转账方式
                    value:0,
                },
                 options: [],
                 mintop:false,
            }
        },
        methods: {
            prsubmit(){
                let self = this 
                self.$http.post('/api/pay/offerChannel',{
                       "account":this.$store.state.user.account, //账号
                       "payType":this.$route.params.pa,
                })
                .then(function(response) {
                    if(response.data.code=='200'){
                      self.options=response.data.data
                      self.mintop=true
                    }
                })
            },
        },
        computed: {
          // 计算属性的 getter
          reversedMessage: function () {
             return  parseFloat(this.options[this.form.value].bankType)
          }
        },
        mounted(){
         this.prsubmit()
        }
    }
</script>

<style lang="less" scoped>
@import url('../../../../resource/css/set_nav.less');
#step1{
    margin-top: -20px;
    h2{
       color: #ffcd13;
    font-weight: 400;
    width: 715px;
    height: 80px;
    text-align: center;
    margin: 0 auto;
    line-height: 80px;
    font-size: 32px;
    border-bottom: solid 1px #533c12;
    text-shadow: black 0.1em 0.1em 0.2em; 
    }
    .stepform{
        width: 715px;
        margin: 0 auto;
    }
    .el-form-item p{
       margin: 0;
       line-height: 49px;
         color: #503d1d;
         font-weight: 600;
    }
    .smewm{
        text-align: center;
        color: #5b3204;
        img{
          margin-top:10px;
        }
    }
}
</style>
<style type="text/css">
#step1 .el-input__inner,#step1 .el-input--suffix{
  background:0 none;
  border:0 none;
  height:50px;
  line-height:50px;
  color: #fec81e;
  font-size:20px;
  width: 380px;
text-shadow: black 0.1em 0.16em 0.5em;
}
#step1 .el-input,#step1 .el-select,#step1 .el-select,#step1  .el-date-editor{
    background-size: 380px 50px;
    width: 380px;
}
#step1 .el-form-item__label{
    float: left;
    display: block;
    width: 60px;
    color: #5b3204;
    font-size: 20px;
    line-height: 49px;
    font-weight: 600;
}
#step1  .el-form-item{
    margin-bottom: 10px;
}
#step1 .el-date-editor{
       height:50px;
      background:url(../../../../resource/images/leftnav/srk.png) no-repeat;
      background-size: 380px 50px;
}
</style>
