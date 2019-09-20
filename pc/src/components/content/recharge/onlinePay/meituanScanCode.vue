<template>
    <div class="elcontain-fluid">     
        <el-row> 
            <el-col :span="24">                
                <img class="header-logo" src="../img/meituan-scancode.png" alt="">                                
            </el-col>
            <el-col :span="8">
                <span class="input-label right">充值金额：</span>
            </el-col>                   
            <el-col :span="8">
                <el-input placeholder="请输入"></el-input> 
            </el-col>
            <el-col :span="8" :offset="8" >
                <i class="input-notice left">单笔限制10-50000元</i> 
            </el-col>   
        </el-row>
        <el-row>  
            <el-col :span="8">
                <span class="input-label right">选择渠道：</span>              
            </el-col>                              
            <el-col :span="8">
                <span class="input-label"></span>
                <el-button-group>
                    <el-button type="primary" plain>渠道1</el-button>
                    <el-button type="primary" plain>渠道2</el-button>
                    <el-button type="primary" plain>渠道3</el-button>
                </el-button-group>
            </el-col>           
            
            <el-col :span="24">
                <el-button type="primary">
                    提交
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
        Amount:''
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
                    }
                 })
          }
    },
    mounted(){
        this.prsubmit()
      //  alert(this.$route.params.pa)
    }
}
</script>

<style scoped lang="less">

.el-col {
    text-align: center;
    margin:10px 0
}
.input-notice, .input-label {
    padding: 10px 5px
}
.header-logo {    
    width: auto;
    height: 150px;
}
</style>