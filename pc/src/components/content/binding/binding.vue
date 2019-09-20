<template>
    <div class="withdraw">
        <div class="withdraw-cont">
            <div class="window-left">
                <h5>绑定</h5>
                <ul>
                    <li>
                        <router-link to="/binding/1" class="yhk"><img src="@/resource/images/yhktb.png" alt=""></router-link>
                    </li>
                    <li>
                        <router-link to="/binding/2" class="zfb">
                            <img src="@/resource/images/zfbtb.png" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="window-right">
                <div class="right-cont">
                    <div class="next-step-0" v-if="channel.account">
                        <div class="current-channel">
                            <img src="@/resource/images/tx.png" alt="">
                            <p>{{channel.name}}</p>
                            <p>{{channel.account}}</p>
                        </div>
                        <!-- <div v-else class="add-channel" @click="step = 1" >
                            <span v-if="drawType == '2'">+绑定支付宝</span>
                            <span v-if="drawType == '1'">+添加银行卡</span>
                        </div> -->
                    </div>
                    <div class="next-step-1" v-else>
                        <h3>
                            <img v-if="drawType == '2'" src="@/resource/images/zfbbd.png" alt="">
                            <img v-else src="@/resource/images/yhkbd.png" alt="">
                        </h3>
                        <div class="input-info">
                            <div>
                                <label for="">收款姓名:</label>
                                <input class="set_input" v-if="$store.state.user.aliPayName==null" v-model="realName" type="text" placeholder="请输入收款姓名" :disabled="!!$store.state.user.realName">
                                <span v-else>{{$store.state.user.aliPayName}}</span>
                            </div>
                            <div v-if="drawType == '1'" class="select">
                                <label for="">选择银行:</label>
                                <select name="" id="" v-model="bankId">
                                    <option v-for="(item, idx) in bankList" :key="idx" :value="item.bankId" >{{item.bankName}}</option>
                                </select>
                            </div>
                            <div v-if="drawType == '1'">
                                <label for="">开户地址:</label>
                                <input type="text" v-model="bankProvince" placeholder="请输入开户地址">
                            </div>
                            <div v-if="drawType == '1'">
                                <label for="">银行卡号:</label>
                                <input type="text" v-model="bankNum" placeholder="请输入银行卡号">
                            </div>
                            <div v-if="drawType == '2'">
                                <label for="">收款账户:</label>
                                <input type="text" v-model="zhbAccount" placeholder="请输入收款账户">
                            </div>
                            <div class="tijiao">
                                <span @click="bingChannel()"><img src="@/resource/images/tj.png" alt=""></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <p class="explain"><strong>提现说明</strong>：<br>
                    绑定支付宝账户，*姓名不能修改，仅能绑定姓名下的支付宝账户。
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
                channel: {},
                bankList: [],
                zhbAccount: '',
                bankNum: '',
                bankAddress: '',
                bankId: '',
                bankProvince: '',
                realName: ''
                // step: 0
            }
        },
        watch:{
            '$route' (n,o) {
                if(n.params.id=='1'){
                    if(this.$store.state.user.bankAccount!==null){
                         this.$router.push("/withdraw/1");
                    }
                }else{
                     if(this.$store.state.user.aliAccountId!==null){
                         this.$router.push("/withdraw/2");
                    }
                }
                this.getChannel(n.params);
            }
        },
        methods: {
            // 获取渠道信息
            getChannel (params) {
                var user = this.$store.state.user;
                this.realName = user.realName;
                this.drawType = params.id;
                var account = '';
                var name = '';
                if (params.id === '2') {
                    account = user.aliAccountId;
                    name = user.aliAccountName;
                } else {
                    account = user.bankAccount;
                    name = user.bankAccountName;
                    if (!user.bankAccount) {
                        this.getBankList(user);
                    }
                }
                this.$set(this.channel, 'account', account);
                this.$set(this.channel, 'name', name);
            },
            // 获取银行卡列表
            getBankList(user) {
                this.$http.post('/api/userProfile/getBankList', {token: user.token}).then(response => {
                    if (response.data.code !== '200') return;
                    this.bankList = response.data.data.bankList;
                });
            },
            // 绑定渠道
            bingChannel () {
                var params;
                var vm = this;
                var user = this.$store.state.user;
                var url = "/api/userProfile/bindAliNumber";
                if (this.drawType == '2') {
                    params = {
                        "account": 'ashun1', // user.account
                        "aliPayAccount": this.zhbAccount,
                        "aliPayName": this.realName,
                        "realName": this.realName,
                        "token": user.token
                    }
                } else {
                    url = "/api/userProfile/bindBank";
                    params = {
                        "account": user.account,
                        "bankAccount": this.bankNum,
                        "bankAccountName": this.realName,
                        "realName": this.realName,
                        "bankID": this.bankId,
                        "bankProvince": this.bankProvince,
                        "token": user.token
                    }
                }
                this.$http.post(url, params).then(response => {
                    if (response.data.code !== '200') return;
                    var user = this.$store.state.user;
                    vm.realName = params.realName;
                    if (vm.drawType === '2') {
                        user['aliAccountId']=response.data.data.aliPayAccount
                        user['aliAccountName']=response.data.data.aliPayName
                        vm.$set(vm.channel, 'account', user.aliAccountId);
                        vm.$set(vm.channel, 'name', user.aliAccountName);
                        vm.$MessageBox({
                            message: '支付宝绑定成功',
                            confirmButtonText: '确 认',
                            customClass: 'custom-messageBox',
                            type: 'success',
                            center: true
                        })
                    } else {
                        user['bankAccount']=response.data.data.bankAccount
                        user['bankAccountName']=response.data.data.bankAccountName
                        vm.$set(vm.channel, 'account', user.bankAccount);
                        vm.$set(vm.channel, 'name', user.bankAccountName);
                        vm.$MessageBox({
                            message: '银行卡绑定成功',
                            confirmButtonText: '确 认',
                            customClass: 'custom-messageBox',
                            type: 'success',
                            center: true
                        })
                    }
                    vm.$store.commit('getUser', user);
                    localStorage.setItem('user', JSON.stringify(user));
                });
            }
        },
        created() {
            var params = this.$route.params;
            this.getChannel(params);
        }
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
                    -webkit-box-shadow:5px 5px 15px rgba(0, 0, 0, 0.35);
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

                        input, select{
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
                        input[type="text"]:disabled
                        { 
                            cursor: not-allowed;
                        }
                        select{
                            width: 385px;
                            appearance:none;
                            -moz-appearance:none;
                            -webkit-appearance:none
                        }
                        .select{
                            position: relative;
                            &::before{
                                content: '';
                                position: absolute;
                                top: 16px;
                                right: 15px;
                                width: 30px;
                                height: 30px;
                                background: url('../../../resource/images/xyy.png') no-repeat;
                                background-size: 80%;
                            }
                            select{
                                margin: 0;
                                padding: 0;
                            }
                            option {
                                background: #502d1d;
                                line-height: 30px;
                                height: 30px;
                                display: inline-block;
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
                    .add-channel{
                        border: 1px dashed #ffcb1f;
                        margin: 80px auto 0;
                        width: 260px;
                        height: 160px;
                        text-align: center;
                        line-height: 160px;
                        color: #502d1d;
                        cursor: pointer;
                    }
                    .current-channel{
                        width: 300px;
                        text-align: center;
                        margin: 80px auto 0;
                        color: #502d1d;
                        font-weight: 600;
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
