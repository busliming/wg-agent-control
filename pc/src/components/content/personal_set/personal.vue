<template>
	<div class="Personal">
		<div class="main-content">
			<el-container>
				<div class="lef_nav">
					<h2 style="letter-spacing:0;">个人设置</h2>
					<ul class="on_Line">
						<router-link tag="ol" :class="{active:isac=='/personaldata'}" @click.native="listactiv('/personaldata')" to="/personaldata">
                            <i></i>
                            <img src="../../../resource/images/leftnav/grzl.png" style="padding-top:10px;">
                        </router-link>
                        <router-link tag="ol" :class="{active:isac=='/personalSafety'}" @click.native="listactiv('/personalSafety')" to="/personalSafety">
                            <i></i>
                            <img src="../../../resource/images/leftnav/zhaq.png">
                        </router-link>
                    </ul>
				</div>
				<el-row id="main-contents">
                    <el-col>
                        <router-view/>  
                    </el-col>
                    <!-- <div class="botton_box" v-if="isac=='/personaldata'">
                        <h4><strong>说明：</strong></h4>
                        <h4><strong>转账到银行卡</strong></h4>
                        <i style="font-size:0.8em;">为了加快财务审核速度，请您完成转账后，再提交订单，如遇到金额未到账等问题，请咨询在线客服。</i> 
                    </div>
                   <div class="botton_box" v-if="isac=='/personalSafety'">
                        <h4><strong>说明：</strong></h4>
                        <h4><strong>个人资料</strong></h4>
                        <i style="font-size:0.8em; line-height:2rem;">*请尽量保持资料完整，在您需要帮助的时候，客服会使用您的信息验证身份。</i>
                        <br>
                        <i style="font-size:0.8em;">*请勿相信QQ、微信客服，谨防被骗</i>
                    </div>                   -->
                </el-row>  
			</el-container>
		</div>
	</div>
</template>

<script>
export default {
    data () {
        return {
            isac:null
        }
    },
    components: {    
    },
    methods: {             
       listactiv(i){
           this.isac=i
       }
    },
    mounted(){
      this.isac=this.$route.path
    }
}
</script>
<style scoped lang="less">
@import url('../../../resource/css/set_nav.less');
.on_Line{
	margin-top: 15px;
	ol{
		    background:url(../../../resource/images/leftnav/kuang1.png) no-repeat;
		    height:50px;
		    width: 168px;
		    margin:0 0 10px 23px;
		    padding-inline-start: 0;
	   img{
	    vertical-align: unset;
	    display: block;
	    margin: 0 auto;
	    padding-top:6px;
	   }
	}
	.active{
	    background:url(../../../resource/images/leftnav/kuang0.png) no-repeat;

     }
}
</style>