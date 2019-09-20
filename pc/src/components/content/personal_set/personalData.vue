<template>
	<div class="personalData">
		<div class="fluid_box">
			 <h2>个人资料设置</h2>
			 <div class="tabs">
			 	 <ul>
			 	 	<li v-for="(item,index) in Portrlist" v-if='index<5' :key="index+1" :class="{avtive:pvc==index+1}" @click="tabspvc(index+1,$event)" :data-img="item">
			 	 		<img :src="item">
			 	 	</li>
			 	 	<!-- <li :class="{avtive:pvc==1}" @click="tabspvc(1,$event)">
			 	 		<img src="../../../resource/images/leftnav/tx.png">
			 	 	</li>
			 	 	<li :class="{avtive:pvc==2}" @click="tabspvc(2,$event)">
			 	 		<img src="../../../resource/images/leftnav/tx.png">
			 	 	</li>
			 	 	<li :class="{avtive:pvc==3}" @click="tabspvc(3)">
			 	 		<img src="../../../resource/images/leftnav/tx.png">
			 	 	</li>
			 	 	<li :class="{avtive:pvc==4}" @click="tabspvc(4)">
			 	 		<img src="../../../resource/images/leftnav/tx.png">
			 	 	</li> -->
			 	 </ul>
			 </div>
             <div class="input_box">
             	<div class="demo-input-suffix">
			 	 	  <span>账号：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="$store.state.user.account" disabled>
					  </el-input>
             	</div>
             	<div class="demo-input-suffix">
			 	 	  <span>ID号：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="$store.state.user.playId" disabled>
					  </el-input>
             	</div>
				 <div class="demo-input-suffix">
			 	 	  <span>姓名：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="s4" :disabled="!!$store.state.user.realName">
					  </el-input>
             	</div>
             	<div class="demo-input-suffix">
			 	 	  <span>昵称：</span>
			 	 	  <el-input class="set_input"
					    placeholder="请输入内容"
					    v-model="s3">
					  </el-input>
             	</div>
             	<div class="demo-input-suffix radio_box">
			 	 	  <span>性别：</span>
			 	 	  <el-radio v-model="radio" label="1">男</el-radio>
                      <el-radio v-model="radio" label="0">女</el-radio>
             	</div>
             </div>
             <div class="scanbottom">
                <el-button @click="closed()">
                    取消
                </el-button>
                <el-button @click="submit()">
                    提交
                </el-button>
            </div>

		</div>
	</div>
</template>
<script>
export default {
    data () {
        return {
        	inputs:[],
        	radio:1,
        	pvc:1,
        	s3:'',
        	s4: this.$store.state.user.realName || '',
        	Portrlist:[],
        }
    },
    methods: {
         getPortraitList(){
         	    let self =this;
         	   self.$http.post('/api/userProfile/getPortraitList')
                .then(function(response) {
                 self.Portrlist=response.data.data
                })
         },             
	     tabspvc(i,event){
	     	let el = event.currentTarget;
	     	this.pvc=i
            let d=el.dataset.img.lastIndexOf('/')+1
            this.inputs.pvc=el.dataset.img.substr(d,1)
	      // alert(this.inputs.pvc);
	     },
	     submit(){
				 let statex = this.isin(); 
				let user = this.$store.state.user;
	      	    if(!statex){
	                return;
	            };
	     	    let self = this
                // this.$store.dispatch('switch_dialog',self)
                self.$http.post('/api/userProfile/updateUserProfile',{
                       "account": user.account, //账号
                      "gender":self.radio,
					  "id": user.id,
					  "image":self.pvc,
					  "nickName":self.s3,
					  "realName":self.s4,
					  "token":user.token
                }).then(function(response) {
                   if(response.data.code=='200'){
                   	    self.$Message({
				          message:response.data.msg,
				          type: 'success'
						});
						if (!user.realName) {
							user.realName = self.s4;
						}
						user.gender = self.radio;
						user.nickName = self.s3;
						self.$store.commit('getUser', user);
                    	localStorage.setItem('user', JSON.stringify(user));
                    }
                });
	     },
	     isin(){
	     	if(!this.s3){
	     		this.$Message({
		           message:'昵称不能为空',
		           type: 'error'
				 });
              return false
	     	}
	     	if(!this.s4){
	     		this.$Message({
		           message:'姓名不能为空',
		           type: 'error'
				 });
              return false
	     	}
	     	if(!this.radio){
              this.$Message({
		           message:'性别不能为空',
		           type: 'error'
			   });
              return false
	     	}
	     	return true
	     },
	     closed(){
	     	this.inputs=[]
	     },
    },
    mounted(){
        this.getPortraitList()
        this.s3=this.$store.state.user.nickName
        this.s4=this.$store.state.user.realName
		this.radio=this.$store.state.user.gender || 1;
    }
}
</script>
<style scoped lang="less">
@wiht:717px;
.fluid_box{
    width: 810px;
    height:677px;
    background:rgba(41,35,23,0.15);
    border-radius:10px;
	margin:38px auto 10px;
	-webkit-box-shadow: 5px 5px 10px #817452;
	-moz-box-shadow: 5px 5px 10px #817452;
   	box-shadow: 5px 5px 10px #817452;
   	h2{
    color: #ffcd13;
    font-weight:400;
    width: 715px;
    height:80px;
    text-align:center;
    margin:0 auto;
    line-height:80px;
    font-size:32px;
    border-bottom: solid 1px #533c12;
    text-shadow: black 0.1em 0.1em 0.2em
   }
}
.tabs{
	width:@wiht;
	margin: 0 auto;
	ul{
		overflow: hidden;
		padding-top: 37px;
		min-height: 108px;
		li{
			float: left;
			width: calc(100% / 5 - 32px);
			margin-right: 12.5px;
			background:rgba(193,173,110,0.5);
			border: solid 1px #705a29;
			padding: 10px;
			border-radius:5px;
			img{
				display: block;
				width: 100%;
			}
		}
		li:last-child{
              margin:0;
		}
		.avtive{
			background:rgba(194,160,73,0.7);
		}
	}
}
.input_box{
	width:@wiht;
	@_wile:60px;
	margin:10px auto 0;
	.demo-input-suffix{
		padding:12px 15% 0;
		overflow: hidden;
		span{
         float:left;
         display: block;
         width:@_wile;
         color: #5b3204;
         font-size: 20px;
         line-height:49px;
         font-weight:600;
		}
		.el-input{
			width:calc(100% - @_wile);
			height:50px;
			background:url(../../../resource/images/leftnav/srk.png) no-repeat;
		}
	}
}
.scanbottom{
    margin:21px auto 0;
    width: 715px;
    .el-button{
      background:url(../../../resource/images/leftnav/juk.png) no-repeat; 
      width: 126px;
      height:48px;
      border: 0 none;
      float: right;   
      color: #5e3f2b;
      font-size:18px;
	  font-weight: 600;
	  -webkit-box-shadow: 3px 3px 10px #817452;
	  -moz-box-shadow: 3px 3px 10px #817452;
      box-shadow: 3px 3px 10px #817452;
      margin-left:20px;
    }

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
</style>
