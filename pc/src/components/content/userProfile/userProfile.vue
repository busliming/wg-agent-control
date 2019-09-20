<template>
    <div class="userProfile">        
        <div class="main-content">
            <div class="box1">
                <div class="row1">
                    <div class="header">
                        <div class="header-logo" ></div>
                        <p>账户信息</p>                    
                    </div>   
                    <div class="btn-group">
                        <router-link to="">
                            <span class="btn1" name="保险箱" @click="openSafeModal()">                                
                            </span>
                        </router-link>
                        
                        <router-link to="/withdraw/1" name="提现">
                            <span class="btn2"></span>
                        </router-link>                       
                        <router-link to="/zfbScanCode/5" name="充值">
                            <span class="btn3"></span>
                        </router-link>
                    </div> 
                </div>
                 
                <div class="row2">
                    <div class="col">
                        <div class="col-header">
                            账户
                        </div>
                        <div class="col-data">
                            {{ userProfile.account }}
                        </div>
                    </div>
                    <div class="col">
                        <div class="col-header">
                            账户余额
                        </div>
                        <div class="col-data">
                            {{ userProfile.money }} 元
                        </div>
                    </div>
                    <div class="col">
                        <div class="col-header">
                            银行卡
                        </div>
                        <div class="col-data">
                            <router-link to="/withdraw/1" v-if="userProfile.bankAccount!==null">
                                <p>1张</p>
                            </router-link>                            
                            <p v-else>无</p>                            
                        </div>
                    </div>
                    <div class="col">
                        <div class="col-header">
                            支付宝
                        </div>
                        <div class="col-data">
                            <router-link to="/withdraw/2" v-if="userProfile.aliAccountId!==null">
                                <p>{{ userProfile.aliAccountId }}</p>
                            </router-link>                            
                            <p v-if="userProfile.aliPayAccount==null">无</p>
                        </div>
                    </div>     
                </div>               
            </div>
            
            <div class="box2">
                <div class="box-content">
                    <div class="nav-bar">                   
                        <router-link to="" :class="{active : (activeTab ==1)}">                            
                            <div id="tab1" class="tab-title" @click="setActive(1)">充提记录</div>
                        </router-link>     
                        <router-link to="" :class="{active : (activeTab ==2 )}" >
                            <div id="tab2" class="tab-title" @click="setActive(2)">游戏记录</div>
                        </router-link>
                        <router-link to="" :class="{active : (activeTab ==3 )}">
                            <div id="tab3" class="tab-title" @click="setActive(3)">推广返利</div>
                        </router-link>                      
                    </div>                
                    <div class="tab-content" v-if="activeTab==1">                        
                        <depositRecord></depositRecord>
                    </div>
                    <div class="tab-content" v-if="activeTab==2">
                        <game-record></game-record>
                    </div>
                    <div class="tab-content" v-if="activeTab==3">
                        <promotion-rebate></promotion-rebate>
                    </div>  
                </div>                                                          
            </div>
        </div>        
        <safe-money></safe-money>        
    </div>  
</template>

<script>
    import depositRecord from './depositRecord' 
    import gameRecord from './gameRecord' 
    import promotionRebate from './promotionRebate'
    import safeMoney from './safeMoney'
    export default {        
        data () {
            return {   
                userProfile: '',
                activeTab: 1,
                modalState: {}            
            }
        },
        components: {          
            depositRecord,                       
            gameRecord,     
            promotionRebate,
            safeMoney
        },
        methods: {    
            openSafeModal() {
                if (this.userProfile.safePassword == 0) {
                    this.$MessageBox
                    .confirm(
                        "为了您能够正常使用保险箱，请前往设置资金密码",
                        "未设置资金密码",
                        {
                        customClass: 'custom-messageBox',
                        confirmButtonText: "前 往",
                        cancelButtonText: "取 消",
                        type: "warning"
                        }
                    )
                    .then(() => {
                        this.modalState.state = false;
                        this.$router.push("/personalSafety");
                    });
                    return;
                }
                this.modalState.state = true
            },        
            setActive(id) {
                this.activeTab = id;    
            },           
            getUser () {
                var vm = this;
                store.commit('getUser')
            },            
            formatTooltip(val){
                return val / 100;
            },            
        },    
        beforeMount() {
            this.userProfile = this.$store.state.user; 
            if (this.userProfile.user) {
                this.$router.push('/home')
            }
            this.modalState =this.$store.state.safeMoneyModal;
        },
        beforeRouteLeave (to, from, next){
            if(to.path=="/withdraw/1" || to.path=="/withdraw/2"){
                  if(this.userProfile.realName==null){
                        this.$MessageBox.confirm(
                        "为了您能够正常绑定银行卡，请前往设置个人，设置真实姓名",
                        "未设置姓名",
                        {
                        customClass: 'custom-messageBox',
                        confirmButtonText: "前 往",
                        cancelButtonText: "取 消",
                        type: "warning"
                        })
                        .then(() => {
                            this.$router.push("/personaldata");
                        });
                  }else{
                    next()
                  }       
            }else{
                  next()
            }
        }
        //     this.userProfile = this.$store.state.user; 
        // },
    }
</script>

<style scoped lang="less">
@import url('../../../resource/css/css.less');
    .userProfile{
        background:url(../../../resource/images/bj1.png) no-repeat;
        background-position: bottom;
        background-color: #503d1d;
        height: auto;
        overflow: hidden;
        .main-content{
            width: 1200px; margin: 0 auto;
            font-family: SimHei regular;
            .box1{
                margin-top: 39px; height: 202px;
                background: url(../../../resource/images/userProfile/s.png) no-repeat;                
                display:flex; flex-flow: column nowrap;
                .row1{
                    display: flex; justify-content: space-between;
                    color: #6e4e03; font-weight: 600;
                    .header{      
                        display: flex;                
                        .header-logo{
                            margin-top: 43px; margin-left: 44px;
                            background: url(../../../resource/images/userProfile/zhtb.png) no-repeat;
                            width: 20px; height: 20px; 
                        }
                        p{
                            margin-top: 42px; margin-left: 5px;
                            font-size: 19px;
                        }
                    }
                    .btn-group{
                        display: flex; flex-direction: row; width: 238px;
                        margin-top: 36px; margin-right: 48px; justify-content: space-between;
                        a{
                            background: url(../../../resource/images/userProfile/aniudi.png) no-repeat;
                            width: 70px; height: 26px; 
                            color:inherit; 
                            display: flex; justify-content: center;
                            .btn1{
                                background: url(../../../resource/images/userProfile/bxx.png) no-repeat;
                                width: 43px; height: 14px; align-self: center;
                            }
                            .btn2{
                                background: url(../../../resource/images/userProfile/tx.png) no-repeat;
                                width: 29px; height: 14px; align-self: center;
                            }
                            .btn3{
                                background: url(../../../resource/images/userProfile/cz.png) no-repeat;
                                width: 28px; height: 14px; align-self: center;
                            }
                        }      
                        a:hover{background: url(../../../resource/images/userProfile/laniudi.png) no-repeat;}                  
                    }
                }                
                .row2{
                    width: 1119px; height: 79px; margin: 0 auto;
                    background-color: #dac083; border: #66501e 1px solid;
                    display: flex; justify-content: space-evenly; text-align: center;
                    .col{
                        margin-top: 13px; font-size: 16px; color: #604a19;
                        width: 25%;
                        .col-header{font-weight: bold}
                        .col-data{
                            margin-top: 19px; font-weight: bold;
                            a{color: inherit}
                        }
                    }
                }                
            }
            .box2{
                width: 100%; min-height: 627px; margin: 0 auto 40px auto; display:flex;
                background: url(../../../resource/images/userProfile/ddb.png);
                background-size: 100%;      
                .box-content{
                    margin: 19px auto 0 auto;
                    width: 1120px;
                    .nav-bar{
                        width: 100%; height: 37px; display: flex;
                        text-align: center;
                        background: url(../../../resource/images/userProfile/btdi.png) no-repeat;
                        a{
                            width: calc(100%/3); height: 35px; margin-top: 1px;
                            font-size: 14px; color: #f5f205;          
                            .tab-title{height: 100%; padding-top: 10px;}                  
                        }
                        a:hover, .active{
                            background: linear-gradient(180deg, #fd9c00, #d49203);
                            background-color: #fd9c00
                        }                        
                    }
                    .tab-content{
                        color: #604A19;                         
                        margin-top: 25px; //border: 1px solid #54400e;
                    }
                }     
            }
        }        
    }
</style>