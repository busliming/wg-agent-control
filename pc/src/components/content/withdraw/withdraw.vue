<template>
    <div class="withdraw">
        <div class="withdraw-cont">
            <div class="window-left">
                <h5>提现</h5>
                <ul>
                    <li>
                        <router-link to="/withdraw/1" class="yhk"><img src="@/resource/images/yhktb.png" alt=""></router-link>
                    </li>
                    <li>
                        <router-link to="/withdraw/2" class="zfb">
                            <img src="@/resource/images/zfbtb.png" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="window-right">
                <div class="right-cont" v-if="account">
                    <h3>
                        <img v-if="drawType == '2'" src="@/resource/images/zfbtx.png" alt="">
                        <img v-else src="@/resource/images/yhktx.png" alt="">
                    </h3>
                    <div class="input-info">
                        <div>
                            <label for="">收款姓名:</label>
                            <span>{{realName}}</span>
                        </div>
                        <div>
                            <label for="">收款账户:</label>
                            <span>{{account}}</span>
                        </div>
                        <div>
                            <label for="">提现金额:</label>
                            <input type="text" placeholder="请输入提现金额" v-model="money">
                        </div>
                        <p>(当日提现额度剩余5000元，单笔限制100-5000元)</p>
                        <div>
                            <label for="">提现密码:</label>
                            <input type="text" placeholder="请输入提现密码" v-model="password">
                        </div>
                        <div class="tijiao">
                            <span @click="getWithdraw()"><img src="@/resource/images/tj.png" alt=""></span>
                        </div>
                    </div>
                </div>
                <div class="right-cont" v-else>
                    <div class="bing">
                        <div class="bing-title"><img src="@/resource/images/tstb.png" alt="">&nbsp;&nbsp;<span>{{bingTitle}}</span></div>
                        <div class="bing-cont">{{bingCont}}</div>
                        <div class="bing-footer">
                            <router-link :to="'/binding/'+drawType" class="btn">确定</router-link>
                        </div>
                    </div>
                </div>
                <!-- <p class="explain"><strong>提现说明</strong>：<br>
                    为了加快财务审核速度，请您完成转账后，再提交订单，如遇到金额未到账等问题，请咨询在线客服。
                </p> -->
            </div>
        </div>
    </div> 
</template>

<script>
    export default{
        data () {
            return {
                drawType: '',
                bingTitle: '',
                bingCont: '',
                realName: '',
                account: true,
                money: '',
                password: ''
            }
        },
        watch:{
            '$route' (n,o) {
                this.getChannel(n.params);
            }
        },
        methods: {
            getChannel (params) {
                this.drawType = params.id;
                var user = this.$store.state.user;
                this.realName = user.realName;
                if (params.id === '2') {
                    this.account = user.aliAccountId;
                    this.bingTitle = '添加支付宝';
                    this.bingCont = '你还没有绑定支付宝， 前往绑定？';
                } else {
                    this.account = user.bankAccount;
                    this.bingTitle = '添加银行卡';
                    this.bingCont = '你还没有绑定银行卡， 前往绑定？';
                }
            },
            getWithdraw () {
                var user = this.$store.state.user;
                var params =  {
                    "account": user.account,
                    "amount": this.money,
                    "bankType": this.drawType,
                    "moneyPassword": this.password
                };
                this.$http.post('/api/pay/toDrawCondition', params).then(response => {
                    if (response.data.code === '200'){
                        this.$Message.success(response.data.msg);
                    }
                })
                
            }
        },
        created() {
            var params = this.$route.params;
            this.getChannel(params);
        },
    }
</script>

<style scoped lang="less">
    .withdraw{
        background: url(../../../resource/images/bj1.png) no-repeat;
        background-size: cover;
        .withdraw-cont{
            width: 990px;
            margin: 0 auto;
            display: flex;
            position: relative;
            padding-left: 210px;
            height: 944px;
            padding-top: 60px;
            padding-bottom: 60px;
            .window-left{
                width: 210px;
                float: left;
                background: url('../../../resource/images/zdi.png') no-repeat left top;
                position: absolute;
                left: 0;
                top: 55px;
                height: 964px;
                z-index: 100px;
                -webkit-box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                -moz-box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                h5{
                    font-size: 20px;
                    text-align: center;
                    margin: 10px auto 0;
                    padding: 0;
                    text-align: center;
                    border-bottom: 1px solid #333;
                    width: 180px;
                    line-height: 50px;
                    
                }
                li{
                    background: url('../../../resource/images/wxzaniudi.png') no-repeat left bottom;
                    background-size: 100% 100%;
                    width: 170px;
                    height: 50px;
                    margin: 0 auto;
                    margin-top: 15px;
                    
                    a{
                        display: block;
                        width: 163px;
                        height: 43px;
                        &:hover{
                            border: 2px solid #ffcb1f;
                            border-radius: 5px;
                        }
                        img{
                            float: left;
                        }
                    }
                    .zfb{
                       img{
                           margin: 7px 0 0 26px;
                       }
                    }
                    .yhk{
                       img{
                           margin: 12px 0 0 26px;
                       }
                    }
                }
            }
            .window-right{
                width: 990px;
                background: url('../../../resource/images/ydi.png') no-repeat;
                position: relative;
                .right-cont{
                    width: 815px;
                    height: 480px;
                    margin-left: 85px;
                    margin-top: 40px;
                    background: rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    -webkit-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.35);
                    -moz-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.35);
                    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.35);
                    h3{
                        width: 710px;
                        margin: 0 auto 20px;
                        text-align: center;
                        padding-top: 38px;
                        border-bottom: 1px solid #000;
                    }
                    .input-info{
                        width: 500px;
                        margin: 0 auto;
                        font-size: 22px;
                        color: #502d1d;
                        & > p{
                            font-size: 20px;
                            margin: 10px 0;
                            text-align: center;
                        }
                        & > div{
                            height: 45px;
                            margin-top: 10px;
                        }
                        label{
                            margin-right: 10px;
                        }
                        input{
                            background: url('../../../resource/images/srk.png') no-repeat;
                            height: 45px;
                            border: 0;
                            width: 375px;
                            outline: none;
                            padding-left: 10px;
                            color: #ffcb1f;
                            &::-webkit-input-placeholder {
                                color: #ffcb1f;
                            }
                        }
                        .tijiao{
                            margin-top: 40px;
                            text-align: center;
                            span{
                                cursor: pointer;
                            }
                        }
                    }
                    .bing{
                        background: #9a6d08;
                        width: 300px;
                        height: 120px;
                        margin: 80px auto 0;
                        padding: 20px;
                        border-radius: 3px;
                        -webkit-box-shadow: 0 0 5px rgba(255, 203, 31, 0.23);
                        -moz-box-shadow: 0 0 5px rgba(255, 203, 31, 0.23);
                        box-shadow: 0 0 5px rgba(255, 203, 31, 0.23);
                        .bing-title{
                            color: #ffcb1f;
                            font-size: 18px;
                            text-align: center;
                            display: flex;
                            margin: 0 auto;
                            justify-content: center;
                            align-items: center;
                        }
                        .bing-cont{
                            color: #ebe7a0;
                            padding: 20px 0;
                            text-align: center;
                        }
                        .bing-footer{
                            text-align: center;
                            .btn{
                                background: url('../../../resource/images/xaniudi.png') no-repeat;
                                border: 0;
                                height: 30px;
                                width: 70px;
                                outline: none;
                                display: inline-block;
                                line-height: 30px;
                                cursor: pointer;
                                &:active{
                                    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
                                    -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
                                }
                            }
                        }
                    }
                }
                .explain{
                    width: 815px;
                    margin: 0 auto;
                    color: #502d1d;
                    font-size: 20px;
                    padding-top: 20px;
                }
            }
        }
    }
</style>
