<template>
    <div class="tiny-header">
        <div class="tiny-cont">
            <div class="tiny-logo">
                <img src="@/resource/images/header/logo.png" alt="">
            </div>
            <div class="tiny-info">
                <el-row class="row1">
                    <div class="official">
                        <router-link class="link" to="/" @click.native="test()">官方直营</router-link>
                        <router-link class="link" to="/">最佳信誉</router-link>
                    </div>
                    <div class="test-play" v-if="!userId">
                        <router-link to="" class="link help-desk" @click.native="guestLogIn()">
                            <span class="help-desk-icon"></span>&nbsp; 
                            <p>试玩</p>                        
                        </router-link>   
                    </div>
                            
                </el-row>
                <el-row class="row2">
                    <span>国际域名：</span><p class="row-info">{{getHost()}}</p>        
                </el-row>
            </div>
            <!-- 登录之前 -->
            <div class="tiny-user" v-if="loginStt==false">
                <el-row class="row1">
                    <label>账号</label>
                    <input id="userName" v-model="loginParams.account" type="text" placeholder="请输入账号">
                    <input id="verifyCode" v-model="loginParams.vcode" type="text" placeholder="请输入验证码">
                    <img class="displayCode" @click="nowTime=new Date().getTime()" :src="'/api/account/generateCode?'+nowTime" alt="">
                </el-row>
                <el-row class="row2">
                    <label>密码</label>                    
                    <input id="password" type="password" v-model="loginParams.passWord" placeholder="请输入密码">                  
                    <button id="login" @click="login()">登录</button>
                    <!-- <router-link class="link" to="">忘记密码</router-link> -->
                    <!-- <a href="javascipt:void(0)" class="link" @click="getModal(2)">忘记密码</a> -->
                </el-row>                      
            </div>
            <div class="register" v-if="loginStt==false">                
                <div class="reg-btn" @click="getModal(1)"></div>
            </div>
            <!-- 登录之后 -->
            <div class="tiny-notice" v-if="loginStt==true">
                <div class="notice-dot" v-if="gotUnreadMsg == true"></div>
                <router-link to="/notice">
                    <img src="@/resource/images/loggedIn/tix.png" alt="">
                </router-link>                
            </div>
            <div class="tiny-setting" v-if="loginStt==true">
                <div class="btn1">
                    <router-link to="/Personal" @click.native="getModal2()">
                        <img class="btn-content" src="@/resource/images/loggedIn/grsz.png" alt="">
                    </router-link>
                </div>
                <div class="btn2" @click="logout()">
                    <img class="btn-content" src="@/resource/images/loggedIn/tczh.png" alt="">
                </div>
            </div>
            <router-link to="/userProfile" class="tiny-profile" v-if="loginStt==true" @click.native="getModal2(1)">               
                <img class="avatar" src="@/resource/images/bdqb.png" alt="">
                <p class="userName" to="">{{ userId }}</p>
                <img class="arrow" src="@/resource/images/loggedIn/jraniu.png" alt="">               
            </router-link>
        </div>
        <!-- 注册弹窗 -->
        <el-dialog custom-class="custom-dialog" :visible.sync="modalShow" center>
            <template slot="title" v-if="formType == 1">
                <img src="@/resource/images/message/add-user-icon.png" alt="">
                <span>注册账号</span> 
            </template>
            <template slot="title" v-if="formType == 2">
                <img src="@/resource/images/message/lock-icon.png" alt="">
                <span>忘记密码</span> 
            </template>
            <div class="close-btn" @click="modalShow=false"></div>
            <el-form ref="registerForm" :rules="rules" :model="registerForm" label-width="150px">
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="registerForm.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="vcode">
                    <el-input v-model="registerForm.vcode" placeholder="请输入验证码">
                        <!-- <template ></template> -->
                        <span class="verif" @click="getVerification()" slot="append" v-if="$store.state.getSite.codeType=='2'">{{verifyTxt}}</span>
                        <p slot="append" v-else>
                            <img class="displayCode" @click="zuyzmhq()" :src="zcurl" alt="">
                        </p>
                    </el-input>
                </el-form-item>
                <el-form-item label="输入密码：" prop="passWord">
                    <el-input type="password" v-model="registerForm.passWord" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="passWordComfirm">
                    <el-input type="password" v-model="registerForm.passWordComfirm" placeholder="请再次输入密码"></el-input>
                </el-form-item>                
                <el-form-item label="推荐人ID：" v-if="formType==1">
                    <el-input v-model="registerForm.playID" placeholder="请输入推荐人ID"></el-input>
                </el-form-item>                             
            </el-form>                               
            <button type="warning" @click="onSubmit()">{{formType==1 ? '注册' : '找回'}}</button> 
        </el-dialog>
        <!-- 试玩弹框 -->
        <el-dialog custom-class="custom-dialog" :visible.sync="guestModal" center>
            <template slot="title">
                <img src="@/resource/images/message/info-icon.png" alt="">
                <span>提示</span> 
            </template>
            <div class="close-btn" @click="guestModal=false;sendMoney=false;"></div>
            <p class="text">亲爱的玩家，您现在是游客账号，只能体验游戏，无法使用此功能</p> 
            <p style="color:#fff;font-size: 18px;" v-if="sendMoney">（&nbsp;正式账户赠送{{sigUpBonus}}金币&nbsp;）</p>                         
            <button type="warning" @click="upgradeUser()">升级成为正式账号</button> 
        </el-dialog>
    </div>    
</template>

<script>

export default {
    data() {
        var checkAccountPass = (rule, value, callback) => {
            var rule = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
            if (!rule.test(value)) {
                callback(new Error('请输入6-14位字母加数字'));
            } else {
                callback();
            }
        };
        var checkPhone = (rule, value, callback) => {
            var rule = /(^1[2-9]\d{9}$)|(^09\d{8}$)/;
            if (!rule.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        // var validatePass = (rule, value, callback) => {
        //     if (value === '') {
        //     callback(new Error('请输入密码'));
        //     } else {
        //     if (this.ruleForm2.checkPass !== '') {
        //         this.$refs.ruleForm2.validateField('checkPass');
        //     }
        //     callback();
        //     }
        // };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.passWord) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            nowTime: new Date().getTime(),
            //zcnowTime: new Date().getTime(),
            zcurl:'',    
            modalShow: false,
            sendMoney: false,
            guestModal: false,
            loginStt: '',
            identity: '',
            userId: '',
            gotUnreadMsg: '',
            loginParams: {
                account: '',
                passWord: '',
                vcode: ''
            },
            verifyTxt: '发送验证码',
            formType: 1,
            registerForm: {
                account: '',
                phone: '',
                vcode: '',
                passWord: '',
                passWordComfirm: '',
                playID: '',
                validType:this.$store.state.getSite.codeType == 1 ? 1 : 0

            },
            sigUpBonus:0, //注册赠送金额
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: checkAccountPass, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                vcode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: checkAccountPass, trigger: 'blur' }
                ],
                passWordComfirm: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
        loginStt (val) {
            var path = this.$route.path;
            var str = ['/userProfile', '/notice', '/zfbScanCode', '/personaldata']
            if ( val == false) {
                for (var i = 0; i < str.length; i++) {			
                    if (path.includes(str[i])) {
                        this.$router.push('/home');
                        return;
                    }                     
                }  
            }
        }
    },
    methods: {
        //试玩登入
        guestLogIn () {
            var vm = this;
            this.$http.post('/api/account/temlogin').then(response => {
                if (response.data.code == 200) {                    
                    var data = response.data.data;
                    vm.setCookie('token', data.token);
                    vm.userId = data.nickName;
                    vm.identity = data.identity;
                    localStorage.setItem('user', JSON.stringify(data));
                    vm.$store.commit('getUser', data);         
                    vm.loginStt = true;
                } else {
                    this.$Message.error({
                        customClass: 'custom-message',
                        message: response.data.msg,
                        center: true
                    })
                }
            })
        },
        getHost() {
            return window.location.host.replace('www.', '');
        },
        //注册 + 忘记密码弹框
        getModal (num) {
 
            this.formType = num;
            this.modalShow = true;
            this.$http.get('/api/homePage/getInterview').then(response => {
                if (response.data.code !== '200') return;
                this.registerForm.playID = response.data.data ? response.data.data : '';
            });
            this.zuyzmhq()
        },
        //获得注册赠送金额
        getSiteSigUpBonus () {
            this.$http.post('/api/activity/getSiteSigUpBonus').then(response => {
                if (response.data.code !== '200') return;
                this.sigUpBonus = response.data.data ? response.data.data : 0;
            });
        },
        // 试玩账号弹框
        getModal2 (value) {
            if (this.identity == 2) {
                this.guestModal = true;
                if (value) this.sendMoney = true;
                return;
            }
        },
        zuyzmhq(){
                this.zcurl = '/api/account/generateCode?' + new Date().getTime()
        },
        upgradeUser () {
            this.guestModal = false;
            this.sendMoney = false;
            this.getModal(1)
        },
        // 发送金币
        guestReward () {
            if (this.identity == 2) {
                this.$MessageBox({
                    message: '亲爱的玩家，您现在是游客账号，只能体验游戏，无法使用此功能，正式账户赠送3.00金币',
                    confirmButtonText: '确 认',
                    customClass: 'custom-messageBox',
                    type: 'success',
                    center: true
                })
            }            
        }, 
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        onSubmit() {
            var vm = this;
            this.$refs['registerForm'].validate((valid) => {
                if (valid) {             
                    var successTxt = '注册成功, 请登入';
                    var url = '/api/account/sigUp';
                    if (vm.formType == 2) {
                        successTxt = '找回成功, 请登入';
                        url = '/api/account/findPassword';
                    }
                    vm.$http.post(url, vm.registerForm).then(response => {                        
                        if (response.data.code !== '200') return;
                        this.$Message.success({
                            customClass: 'custom-message',
                            message: successTxt,
                            center: true
                        });
                        this.modalShow = false;
                    })
                }
            });
        },
        login(){
            var err = '';
            var vm = this;
            if (!this.loginParams.account) err = '请输入用户名!';
            if (!this.loginParams.passWord) err = '请输入密码!';
            if (!this.loginParams.vcode) err = '请输入验证码!';
            if (err) {
                this.$Message({
                    customClass: 'custom-message',
                    center: true,
                    message: err,
                    type: 'error'
                });
                return;
            }
            this.$http.post('/api/account/login', this.loginParams).then(response => {
                vm.nowTime = new Date().getTime();
                if (response.data.code !== '200') return;
                var data = response.data.data;
                vm.setCookie('token', data.token);
                vm.userId = data.nickName;
                vm.identity  = data.identity;
                localStorage.setItem('user', JSON.stringify(data));
                vm.$store.commit('getUser', data);
                vm.loginStt = true;                
                vm.getNoticeFlag();
                this.$Message.success({                        
                    message: '欢迎客户' + vm.userId + '!',
                    customClass: 'custom-message',
                    center: true,
                })
            });
        },
        getVerification () {
            var vm = this;
            var phoneReg = /(^1[2-9]\d{9}$)|(^09\d{8}$)/;
            if (!phoneReg.test(this.registerForm.phone)) {
                this.$Message({
                    customClass: 'custom-message',
                    center: true,
                    message: '请输入正确的手机号码！',
                    type: 'error'
                });
                return;
            }
            if (this.verifyTxt.indexOf('s') > -1) return;
            this.$http.post('/api/account/sendSms', {phone: this.registerForm.phone, smsType: 1, token: ''}).then(response => {
                vm.verifyTxt = '60s重新发送';
                var num = 60;
                var timer = setInterval(() => {
                    num--;
                    if (num === 0) {
                        clearInterval(timer);
                        vm.verifyTxt = '重新发送';
                    } else {
                        vm.verifyTxt = num+'s重新发送';
                    }
                }, 1000);
            })
        },
        getNoticeFlag () {
            if (this.identity == 2 || !this.userId) return;
            this.$http.post('/api/notice/notice/getUnReadMsgFlag').then(response => {
                this.gotUnreadMsg = response.data.data
            })
        },
        logout () {
            var user = this.$store.state.user;
            this.$MessageBox.confirm("", "你确定退出",{
                customClass: 'custom-messageBox',
                confirmButtonText: "确 定",
                cancelButtonText: "取 消",
                type: "warning",
                center: true 
            }).then(() => {
                this.$http.post('/api/account/gameLogout', {
                    token: user.token,account: user.account
                    }).then(response => {
                    if (response.data.code !== '200') return;
                    this.loginStt = false;
                    // this.getNoticeFlag();
                    this.userId = '';          
                    this.$store.commit('getUser', '');
                    localStorage.setItem('user', '');                    
                    this.$Message.success({
                        customClass: 'custom-message',
                        center: true,
                        message: '再见！',
                    });
                    this.$router.push('/home')

                })              
            });
        },
        getSiteGameDomainInfo(){
                 this.$http.post('/api/account/gameLogout', {
                    
                 })
                .then(response => {

                });
        },

    },
    // watch: {
    //     '$route' () {
    //         this.getNoticeFlag()
    //     }
    // },
    beforeMount() {
        var user = localStorage.getItem('user');
        if (user) {
            this.loginStt = true;
            this.$store.commit('getUser', JSON.parse(user));
            this.userId = this.$store.state.user.nickName;
            this.identity = this.$store.state.user.identity;
        }
    },
    created(){
    	this.getSiteSigUpBonus();
    }
};
</script>

<style scoped lang="less">
    .tiny-header {
        font-family:'SimHei regular'; padding-bottom: 19px;
        background-image: url('../../resource/images/bj.png');  background-size: cover;        
        .btn1, .btn2, #login {background: url('../../resource/images/all.png') no-repeat;}
        .tiny-cont{
            color: #f6d55b;
            width: 1200px; height: 120px; margin: 0 auto; 
            display: flex; flex-flow: column wrap; align-content: center;   
            .tiny-logo{ 
                width: 260px; margin-top: 18px;            
                img{width:100%}                
            }
            .tiny-info{
                width: 291px; height: 100%; margin-left: 29px; padding: 0;  
                .el-row{ text-align: center;}
                .row1{
                    margin-top:41px; height: 20px; display: flex; flex-direction: row; justify-content: space-between;
                    .official{
                        width: 70%;
                        text-align: left;
                        .link{
                            font-size: 22px;
                        }
                    }
                    .test-play{
                        width: 30%;
                        a{
                            float: right;
                        }
                    }
                    .link{color:inherit;font-size: 19px;color: #997530;}                    
                    .help-desk{
                        font-size: 16px;
                        height: 25px; align-self: center;
                        display: flex; flex-flow: row wrap;
                        color: #c2872f;
                        .help-desk-icon{          
                            background-image: url('../../resource/images/header/shiw.png');  
                            width: 22px; height: 25px;
                        }
                        p{margin: 0; align-self: center}
                    }
                }
                .row2{
                    margin-top:20px;                                            
                    color: #FFFFFF; font-size: 17px; height: 32px;
                    display: flex;  align-items: center;
                    padding-left: 20px; 
                    position: relative;
                    span{
                        display: block;
                        width: 275px;
                        height: 31px;
                        background: url(../../resource/images/tiao.png) no-repeat;
                        text-align: left;
                        background-size: 270px 31px;
                        line-height: 31px;
                        padding-left: 20px;
                    }         
                    p{
                        line-height:31px;
                        background: url(../../resource/images/tiaos.png) no-repeat;
                        border-radius:15px;
                        position: absolute;
                        left: 122px;
                        top: -16px;
                        padding: 0 10px;
                        min-width:170px;
                        background-size: 100% 31px;

                    }                    
                }                         
            }
            .tiny-user{
                width: 420px; height: 100%; margin-left: 36px; 
                color: #997530;
                // font-size: 18px;
                .el-row{
                    display: flex; 
                    width:100%; height: 35px;
                    label{
                        min-width: 50px; font-size: 18px; text-align: left;
                        display: flex; flex-direction: column; justify-content: center;
                        
                    }
                    input, #login {
                        border: none;border-radius: 5px; padding: 0 10px;
                        color: #f4e4c9; font-weight: 700;                  
                    }
                    input:hover, input:focus {outline-offset: 0;}
                    button {border: none}
                }                  
                .row1{
                    margin-top: 39px;                                      
                    #userName{
                        width: 145px;
                    }
                    #verifyCode{
                        width: 101px; margin-left: 8px;
                    }
                    .displayCode{width: 68px; margin-left: 4px;cursor: pointer}
                }
                .row2{
                    margin-top: 7px;
                    #password{
                        width: 145px; 
                    }
                    #login{
                        background: url('../../resource/images/header/dniu.png') no-repeat;
                        width: 76px; margin-left: 8px; 
                        font-size: 18px; color: #743a03
                    }
                    #login{
                        width: 80px;
                        text-align: center;
                    }
                    .link{color:inherit; width: 120px; text-align: right; font-size: 18px; display: flex; flex-direction: column; justify-content: center}
                }
                #userName, #password{
                    background-color: rgb(75,58,27);
                    border-style: solid;
                    border-width: 1px;
                    border-radius: 5px;
                    border-image-source: linear-gradient(180deg, #1f180a 0%, #d6c775 100%);
                    border-image-slice: 1;
                }
                #userName:focus, #password:focus {
                    background-color: rgb(123,86,5);
                }
                #verifyCode{
                    background-color: rgb(115,69,10);
                    border-style: solid;
                    border-width: 1px;
                    border-image-source: linear-gradient(180deg, #743a03 0%, #b0a35c 100%);
                    border-image-slice: 1;
                }
                #verifyCode:focus{
                    background-color: rgba(155, 96, 20, 0.6);
                }
            }
            .register{
                margin-left: 35px; margin-top: 39px;
                width: 129px; padding-bottom: 12px;                             
            }
            .tiny-notice{
                width: 104px; height: 66px; text-align: center; margin-left:50px; margin-top: 47px;
                background-color: #674e15; 
                border: #a37e30 1px solid; border-radius: 5px;
                position: relative;
                .notice-dot{
                    background: #f6d55b;
                    width: 10px; height: 10px; border-radius: 5px;
                    position: absolute; top: 2px; right: 2px;                    
                    animation: blinker 1s cubic-bezier(.5, 0, 1, 1) infinite alternate; 
                }              
                @keyframes blinker {
                    0% {background: rgb(249,251,95)}
                    50% {background: rgb(251,224,95)}
                    100% {background: rgb(251,169,95)}                
                }
                img{margin-top: 5px}
            }
            .tiny-setting{
                margin-left: 52px; margin-top: 47px;
                width: 179px; height: 66px; text-align: center;
                .btn1, .btn2{
                    margin-bottom: 6px; height: 29px; width: 176px;
                    background: url('../../resource/images/loggedIn/aniudi.png') no-repeat;                    
                    display: flex; flex-direction: row; align-items: center; justify-content: center;
                }               
            }
            .tiny-profile{
                margin-left: 26px; margin-top: 48px; width: 228px; height: 66px;
                background: url('../../resource/images/loggedIn/aaniudi.png') no-repeat;
                display:flex; flex-direction: row; justify-content: space-evenly;
                .avatar{
                    width:52px; height: 52px; border-radius: 26px;
                    align-self: center;
                }
                .userName{font-size: 19px; color:#AC8435; font-weight: 600; align-self: center;}
                .arrow{align-self: center;}
            }
            .reg-btn {
                background: url('../../resource/images/all.png') no-repeat;
                background-position: -369px -81px;       
                width: 129px;
                height: 77px;           
            }
        }
    }    
    
</style>
<style type="text/css">
    .tiny-header :focus{outline-width: 0;}
    .tiny-header .el-form-item__label, .tiny-header .el-dialog__title, .tiny-header .signup-btn{    
        color: #f6d55b;
        font-weight: 600;   
        text-shadow: #af7b1e 3px 3px
    }  
    .tiny-header .verif{
        cursor: pointer;
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
    }
    .tiny-header .el-form-item__error{
        color: #e22b2b;
    }
    .tiny-header .el-form-item.is-required >.el-form-item__label:before {
        content: '';
    }
</style>
