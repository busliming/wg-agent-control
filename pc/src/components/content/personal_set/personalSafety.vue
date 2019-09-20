<template>
	 <div class="personalSafety" id="lSafety">
	 	<div class="fluid_box top_close" style="height:38px;margin:15px auto;" v-if="showtips">
	 		<i></i>
	 		建议您使用安全模式
	 		<a @click=""></a>
	 	</div>
	 	<div class="fluid_box">
			 <h2>最近登录</h2>
			 <div class="Safetygrade">
                  <img src="../../../resource/images/leftnav/icon_Safety.png">
                  <div class="Safety_left">
                  	  <p><span>安全等级</span><strong>高</strong></p>
                  	  <div class="grade_jd">
                  	  	<div class="lengs"></div>
                  	  	<i></i>
                  	  </div>
                  </div>
                  <div class="Safety_right">
                  	 <p>时间：<span>{{isding.loginDate}}</span></p>
                  	 <p>IP地址：<span if="isding">{{isding.loginAddress}}</span><a @click="queryLog">查看更多</a></p>
                  </div>
			 </div>
		</div>
		<div class="set_list">
			 <div class="list">
			 	 <span class="lets">登录密码</span>
			 	 <span>强度高的密码更安全，建议您使用字母、数字、混合大小写组合密码</span>
			 	  <el-button @click=poplog()>
                    修改
                 </el-button>
			 </div>
			 <div class="list">
			 	 <span class="lets">资金密码</span>
			 	 <span>非常重要，用于提款时验证身份</span>
			 	  <el-button  @click=poplog2()>
                    设定
                 </el-button>
			 </div>
			 <div class="list">
			 	 <span class="lets">手机号码</span>
			 	 <span>提供大额提现、账号异常通知及其他安全验证服务，使您的账户更安全更便捷</span>
			 	  <el-button @click=poplog3()>
                    修改
                 </el-button>
			 </div>
		</div>
    <el-dialog custom-class="custom-dialog" :visible.sync="mess_1" center>      
        <div class="mess_box" v-show="mess_1" style="margin-top: -30px;">  <!-- 这是弹窗后期封装到模块中去 -->
        	<div class="mai">
            <i @click=closes()></i>
	        	 <p class="tetle">登录密码</p>
	        	 <div class="demo-input-suffix" style="margin-top:50px;">
			 	 	  <span>资金密码：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
              type="password"
					    v-model="inputs.s1">
					  </el-input>
	             </div>
	             <div class="demo-input-suffix">
			 	 	  <span>登录密码：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="inputs.s2">
					  </el-input>
	             </div>
	             <div class="demo-input-suffix">
			 	 	  <span>确认密码：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="inputs.s3">
					  </el-input>
	             </div>
	              <div class="scanbottom">
	                <el-button @click=closes()>
	                    取消
	                </el-button>
	                <el-button @click=submit()>
	                    确定
	                </el-button>
	            </div>
	        </div>    
        </div>
      </el-dialog>
        <el-dialog custom-class="custom-dialog" :visible.sync="mess_2" center>
        <div class="mess_box" v-show="mess_2" style="margin-top: -30px;">  <!-- 这是弹窗后期封装到模块中去 -->
        	<div class="mai">
             <i @click=closes()></i>
	        	 <p class="tetle">资金密码</p>
	        	<!--  <div class="demo-input-suffix" style="margin-top:50px;">
			 	 	  <span>手机号码：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="iphone">
					  </el-input>
	             </div> -->
	            <!--  <div class="demo-input-suffix fsyzm">
			 	 	  <span>验证码：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="inputs.m2">
					  </el-input>
					  <button @click="getyzm()" :disabled="show_countdown">{{countdown}}</button>
	             </div> -->
	             <div class="demo-input-suffix">
        			 	 	  <span>新密码：</span>
        			 	 	  <el-input class="set_input"
        					    placeholder="请输入内容"
        					    v-model="inputs.m3" type="password">
        					  </el-input>
	             </div>
	             <div class="demo-input-suffix">
        			 	 	  <span>确认密码：</span>
        			 	 	  <el-input class="set_input" type="password"
        					    placeholder="请输入内容"
        					    v-model="inputs.m4">
        					  </el-input>
	             </div>
	              <div class="scanbottom">
	                <el-button @click=closes()>
	                    取消
	                </el-button>
	                <el-button @click=submit1()>
	                    确定
	                </el-button>
	            </div>
	        </div>    
        </div>
        </el-dialog>
        <el-dialog custom-class="custom-dialog" :visible.sync="mess_3" center>
           <div class="mess_box" v-show="mess_3" style="margin-top: -30px;">  <!-- 这是弹窗后期封装到模块中去 -->
            	<div class="mai">
    	        	 <p class="tetle">修改手机</p>
    	        	 <div class="demo-input-suffix">
            			 	 	  <span>手机号码：</span>
            			 	 	  <el-input class="set_input"
            					    placeholder="请输入内容"
            					    v-model="totalPric" disabled>
            					  </el-input>
    	             </div>
    	            <!--  <div class="demo-input-suffix fsyzm">
    			 	 	  <span>验证码：</span>
    			 	 	  <el-input class="set_input"
    					    placeholder="请输入内容"
    					    v-model="inputs.x2">
    					  </el-input>
    					  <button @click="getyzm()" :disabled="show_countdown">{{countdown}}</button>
    	             </div> -->
    	              <div class="scanbottom" style="width:500px;">
    	                <el-button @click=closes()>
    	                    取消
    	                </el-button>
    	                <el-button> 
    	                    <a :href="$store.state.getSite.serviceUrl" target="_banck">联系客服</a>
    	                </el-button>
    	            </div>
                  <i @click=closes()></i>
    	        </div>    
          </div>
    </el-dialog>      
    <el-dialog custom-class="custom-dialog" :visible.sync="mess_4" center>
    		<div class="mess_box" v-show="mess_4">
    		  	<div class="mai">
    	              <p class="tetle">最近登录</p>
          				  <div class="listbox">
                        <ul>
            						  <ol>
            							  <p>时间</p>
            							  <p>IP地址</p>
            							  <p>设备</p>
            					  	</ol>
                         </ul>
                         <ul class="ulboxs"> 
              						<li v-for="item in iplist.list">
              							<p>{{item.loginDate}}</p>
              							<p>{{item.loginAddress}}</p>
              							<p>{{item.deviceName}}</p>
              						</li>
          					  </ul>
          				  </div>
    				       <a class="more" @click="more">查看更多</a>
                   <i @click=closes()></i>
    			 </div>
    		</div>
    </el-dialog>

	 </div>
</template>
<script>

export default {
    data () {
        return {
        	inputs:[],
        	mess_1:false,
        	mess_2:false,
        	mess_3:false,
          mess_4:false,
        	countdown:'获取验证码',
    			timer:null,
          showtips:true,
    			show_countdown:false,
    			iphone:'',
    			modalShow: false,
    			totalPric:'1111111', //隐藏手机号码
    			iplist:[],
    			pages:1,
    			isding:[],
            }
    },
    methods: {
      getrecent(i,o){  // 这是账户安全
                let self =this;
                function pro () {
                  return new Promise((resolve, reject)=>{ 
                      self.$http.post('/api/userProfile/queryLog',{
                            "pageNum":o,
        					          "pageSize":i
                      })
                      .then(function(response) {
                         if(response.data.code=='200'){
                             if(response.data.data.maxPage<self.pages){
                                self.$Message({
                                    message:"暂无更多内容",
                                    type: 'success'
                                  });
                               self.pages = response.data.data.maxPage
                             }else{
                              self.iplist=[]
                              self.iplist=response.data.data
                              resolve(response.data.data.list[0])
                             }
                          }
                      })
                  })
              }
              pro().then((data) => {
                  this.isding=data
              })    
      },
      more(){
         this.pages++
         this.getrecent(7,this.pages)
      },
      queryLog(){
        // this.getrecent(7,1)
      	this.mess_4=true
      },         
      poplog(){ //设置修改登录密码限制
  	       if(this.$store.state.user.safePassword=='0'){
  		       this.$MessageBox.confirm('为了您的账户安全请设定资金密码，再来修改?', '修改登录密码', {
  				          confirmButtonText: '确定',
  				          cancelButtonText: '取消',
                    customClass: 'custom-messageBox', 
  				          type: 'warning'
  				        })
  		   }else{
        			this.mess_1=true
  		   }
      },
      submit(){ //这是修改登录密码
      	       if(this.inputs.s2!=this.inputs.s3){
                    return  this.$Message.error('两次登录密码不一致请重新设置');
      	       }
                let self =this;
                self.$http.post('/api/userProfile/resetPassword',{
                      "account":this.$store.state.user.account, //账号
          					  "newPassword":this.inputs.s2,//新密码
          					  "safePassword":this.inputs.s1, //资金密码
                })
                .then(function(response) {
                   if(response.data.code=='200'){
                       // self.$store.dispatch('hide_dialog',self)
                        self.$Message({
				          message:response.data.msg,
				          type: 'success'
				        });
                    }else if(response.data.code=='201'){
                        self.$Message({
				           message:response.data.msg,
				           type: 'error'
				        });
				      //  this.$Message.error('错了哦，这是一条错误消息');
                    }
                })
      },
      submit1(){ //修改资金密码
      	        if(this.inputs.m3!=this.inputs.m4){
                    return  this.$Message.error('两次密码不一致请重新设置');
      	        }
                let self =this;
                self.$http.post('/api/userProfile/setMoneyPassword',{
                       "account":this.$store.state.user.account, //账户
          					   "safePassWord":this.inputs.m4,  
          					   "safePassWordCf":this.inputs.m3,
          					  // "vcode":this.inputs.m2, //验证码
                })             
                .then(function(response) {
                   if(response.data.code=='200'){
                        self.closes()
                      	self.$Message({
          				           message:response.data.msg,
          				           type: 'success'
				                 });
                        localStorage.setItem('user', JSON.stringify(response.data.data));
                        self.$store.commit('getUser',response.data.data);
                    }else if(response.data.code=='201'){

                    }
                })
      },
      submit2(){ //修改手机号
      	        let statex = this.phone_login(); 
		      	    if(!statex){
		                return;
	            };
                let self =this;
                self.$http.post('/api/userProfile/resetPhone',{
                      "account":this.$store.state.user.account,
          					  "id":this.$store.state.user.id,
          					  "newPhone":this.iphone,
          					  "phone":this.$store.state.user.phone,
                })
                .then(function(response) {
                   if(response.data.code=='200'){
                        self.closes()
                      	self.$Message({
				          message: '修改成功',
				          type: 'success'
				        });
                    }
                })
      },
      // getyzm(){ //发送验证码
      // 	   let statex = this.phone_login(); 
      // 	    if(!statex){
      //           return;
      //       };
      // 	   let self =this;
      // 	   self.$http.post('/api/account/sendSms',{
      //                 "phone":this.iphone,
					 //  "smsType":3,
					 //  "token":this.$store.state.user.token
      //       })
      // 	   .then(function(response) {
      //              //self.list=response.data.data
      //              if(response.data.code=='200'){
      //                   self.fsyzmxx()
      //                 	self.$Message({
				  //         message:response.data.msg,
				  //         type: 'success'
				  //       });
      //               }else if(response.data.code=='201'){
      //                   self.$Message({
				  //         message:response.data.msg,
				  //         type: 'success'
				  //       });
      //               }
      //           })
      // },
      phone_login(){  //手机号输入框
      	     var phoneReg = /(^1[2-9]\d{9}$)|(^09\d{8}$)/;
                if(this.iphone.length!==11){  
                    this.$Message.error('请输入正确的手机号码！');
                    return false;
                }else if(!phoneReg.test(this.iphone)){
		            this.$Message.error('请输入正确的手机号码！');
		            return;
                }
                return true;
      },
      fsyzmxx(){
      	     const TIME_COUNT = 60;
            if (!this.timer) {
                    this.countdown = TIME_COUNT;
                    this.show_countdown = true;
                    this.timer = setInterval(() => {
                        if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                            this.countdown--;
                        } else {
                            this.stopCountDown()
                        }
                    }, 1000)
                }
      },
      stopCountDown(){
                this.countdown = '获取验证码';
                this.inputs=[]
                clearInterval(this.timer);
                this.show_countdown = false;
                this.timer = null;

       },
      closes(){
      	this.mess_1=false
      	this.mess_2=false
      	this.mess_3=false
        this.mess_4=false
      	this.stopCountDown()
      },
      poplog2(){
         if(this.$store.state.user.safePassword=='1'){
             this.$MessageBox.confirm('为了您的账户安全资金密码只能修改一次,如需修改请联系客服?', '修改资金密码', {
                    customClass: 'custom-message',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
         }else{
              this.iphone=''
              this.mess_2=true
         }
      },
      poplog3(){
      	this.iphone=''
      	this.mess_3=true
      }
    },
	mounted(){
     this.getrecent(7,1)
    }, 
    updated(){
       this.totalPric=this.$store.state.user.phone.replace(/(\d{3})\d{6}(\d{2})/,'$1****$2')
    }

}
</script>
<style scoped lang="less">
@wiht:715px;
.fluid_box{
    width: 810px;
    height:313px;
    background:rgba(41,35,23,0.15);
    border-radius:5px;
	margin:15px auto 10px;
	-webkit-box-shadow: 5px 5px 10px #817452;
	-moz-box-shadow: 5px 5px 10px #817452;
   	box-shadow: 5px 5px 10px #817452;
   	h2{
    color: #ffcd13;
    font-weight:400;
    width:@wiht;
    height:80px;
    text-align:center;
    margin:0 auto;
    line-height:80px;
    font-size:32px;
    border-bottom: solid 1px #533c12;
    text-shadow: black 0.1em 0.1em 0.2em
   }
}
.top_close{
	line-height:38px;
	text-align: center;
	color: #723904;
	i{
		display: inline-block;
		width:26px;
		height:26px;
		background:url(../../../resource/images/leftnav/jin.png) no-repeat;
		vertical-align: middle;
		margin-right: 10px;
	}
	a{
		display: inline-block;
		float: right;
		margin:10px 20px;
		font-weight: bold;
		width:16px;
		height:16px;
		background:url(../../../resource/images/leftnav/chu.png) no-repeat;
	}
}
.Safetygrade{
	width: @wiht;
	margin:50px auto 0;
	overflow: hidden;
	>img{
		float: left;
	}
	.Safety_left{
       float: left;
       margin-left: 18px;
       width: 192px;
       p{
       	margin:10px 0 0 0;
       	 span{
       	 	font-size: 20px;
       	 	font-weight: bold;
       	 	color:#583302;
       	 }
       	 strong{
       	 	font-size:36px;
       	 	font-weight: bold;
       	 	color: #583302;
       	 	vertical-align: middle;
       	 	margin-left: 25px;
       	 }
       }
       .grade_jd{
       	margin-top: 5px;
       	overflow: hidden;
       	  .lengs{
       	  	width: 156px;
       	  	height: 8px; 
       	  	border-radius: 5px;
       	  	background:#ffde00;
       	  	float: left;
       	  	margin-top:6px;
       	  }
       	  i{
       	  	display: inline-block;
       	  	background: url(../../../resource/images/leftnav/tgtb.png) no-repeat;
       	  	width:20px;
       	  	height: 20px;
       	  	float: right;
       	  }
       }
	}
	.Safety_right{
		float:right;
		margin-left:70px;
		margin-top: 10px;
		p{
			color: #583302;
			font-size: 20px;
			margin:10px 0 0 0;
			font-weight:bold;
			a{
				color: #ecdd37;
				font-weight: 100;
				margin-left:30px;
				font-size: 18px;
        cursor:pointer
			}
		}
	}
}
.set_list{
	width:810px;
	margin: 40px auto 0;
	.list{
		background: rgba(251,223,157,0.4);
		border: solid 1px #7b6d4e;
		border-radius:3px;
		padding-left: 15px;
		height: 55px;
		margin-bottom:20px;
        span{
        	font-size: 16px;
        	height: 55px;
        	color: #583302;
        }
        .lets{
        	color: #583302;
        	font-size:20px;
        	line-height: 55px;
        	font-weight:600;
        	margin-right: 30px;
        }
        .el-button{
        	float: right;
        	width: 68px;
        	height: 32px;
        	border: 0 none;
        	background: url(../../../resource/images/leftnav/xaniudi.png);
        	margin:11px;
        	line-height:10px;
        	color: #f5f701;
        }
	}
}

/*这是弹窗后期封装到模块中去*/
.mess_box{
	width: 699px;
	height: 450px;
	.mai{
		position:relative;
    text-align:center;
    top: -10px;
    i{
      width:37px;
      height:37px;
      display: block;
      position: absolute;
      right: 17px;
      top: 30px;
      background: url(../../../resource/images/safeMoney/chu.png);
    }
		.tetle{
			margin: 0;
    text-align: center;
    font-size: 25px;
    color: #ffc627;
    line-height: 66px; 
		}
		.listbox{
      padding: 10px 45px;
            ul{
              background:#844f0b;
              ol{
                overflow: hidden;
                padding-inline-start:0px;
                p{
                  display:inline-block;
                  float: left;
                  color: #ffdd00;
                  width: calc(100%/3);
                  text-align:center;
                  font-size:20px;
                  margin:10px 0;
                }
              }
              li{
                overflow: hidden;
                line-height: 18px;
                 p{
                  display:inline-block;
                  float: left;
                  color: #ffdd00;
                  width: calc(100%/3);
                  text-align:center;
                  font-size:14px;
                  margin:10px 0;
                }
              }
            }
            .ulboxs{
              min-height: 300px;
              max-height: 300px;
              height: 300px;
              overflow-y: scroll;   
            }
            .ulboxs::-webkit-scrollbar {
                width:2px;
                height:2px;
            }
		}
    .more{
    font-size:18px;
    display: inline-block;
    line-height:40px;
    color: #583201;
    }
		.demo-input-suffix{
			width: 540px;
			margin:35px auto;
			overflow: hidden;
			span{
		         float:left;
		         display: block;
		         width:100px;
		         color: #5b3204;
		         font-size: 20px;
		         line-height:47px;
		         font-weight:600;
			}
			.el-input{
			width:calc(100% - 100px);
			height:47px;
			background:url(../../../resource/images/leftnav/tcsrk.png) no-repeat;
	        }
		}
		.fsyzm{
			position: relative;
			button{
				color: #fed40e;
				font-size: 16px;
				position: absolute;
				right: 30px;
    			top: 12px;
    			border: 0 none;
    			background: 0 none;
			}
		}
	}
}
/*弹窗按钮*/
.scanbottom{
    margin:21px auto 0;
    width: 715px;
    text-align: center;
    .el-button{
      background:url(../../../resource/images/leftnav/juk.png) no-repeat; 
      width: 126px;
      height:48px;
      border: 0 none;   
      color: #5e3f2b;
      font-size:18px;
	  font-weight: 600;
	  -webkit-box-shadow: 3px 3px 10px #817452;
	  -moz-box-shadow: 3px 3px 10px #817452;
      box-shadow: 3px 3px 10px #817452;
      margin-left:20px;
      a{
        color: #5e3f2b;
      }
    }
}
button[disabled]:hover{
   cursor: not-allowed;
}
</style>
<style type="text/css">
.set_input .el-input__inner,.set_input.el-input.is-disabled .el-input__inner{
	background:0 none;
	border:0 none;
	height:50px;
	line-height:50px;
	color: #fec81e;
	font-size:20px;
}
.radio_box .el-radio{
	margin-top:18px; 
	color: #573303;
}
.radio_box .el-radio__inner{
	background: 0 none;
	border-color:#fec81e;
}
.radio_box .el-radio__input.is-checked .el-radio__inner{
background:0 none;
border-color:#fec81e;
}
.radio_box .el-radio__inner::after{
	background-color:#fec81e;
	width: 8px;
    height:8px; 
}
.radio_box .el-radio__input.is-checked+.el-radio__label{color:#fec81e }
.el-message-box__title{
	color:#643c08;}
.el-message-box__content{
	color:#643c08;
}	
</style>
