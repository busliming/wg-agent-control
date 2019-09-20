<template>
	<div id="download">
		<div class="banner" style="padding: 0; margin:0;">
			  <img src="../../../resource/images/banner0.jpg">
		</div>
		<div class="main-content">           
            <div class="content_box">
                <el-row :gutter="0" style="margin: 0;">
                        <el-col :span="18" style="padding-right: 20px; height: 493px;">
                            <img src="@/resource/images/download.png" style="width: 100%;height:100%;">
                        	<!-- <ul class="game_list">
                                 <li v-for="item in list">
                                      <div class="bcon">
                                         <img :src="item.img">
                                          <el-button></el-button> 
                                      </div>
                                 </li>
                            </ul> -->
                        </el-col>
                        <el-col :span="6" style="padding:0">
                            <div class="grid-content">
                                <sideBar></sideBar>
                            </div>
                        </el-col> 
                </el-row>
            </div>
        </div>                  
	</div>
</template>
<script>
	    import sideBar from '../../content/home/sideBar'
	export default {
        data () {
            return {
                   list:[
                     {img:require('../../../resource/images/brnn.png')},
                     {img:require('../../../resource/images/brnn.png')},
                     {img:require('../../../resource/images/brnn.png')}
                   ], 
             }
        },
        components: {                   
            sideBar          
        },
    }        
</script>
<style scoped lang="less">
     .banner{
     	img{width: 100%;}
     }
	.main-content{
		margin-top: -4px;
	    background:url(../../../resource/images/bj1.png) no-repeat;
	    height: 523px;
	    overflow: hidden;
	        .content_box{
          		width: 1200px;
          		margin:20px auto;
          		.game_list{
		            margin: 0 5px;
		            padding:0;
		            overflow: hidden;
             			 li{
			                width:calc(100%/3);
			                float: left;
			                .bcon{
				                   /*margin:0 5px;*/
				                   background:url(../../../resource/images/yxdb.png) no-repeat;
				                   height:470px;
				                   background-size: contain;
				                   img{margin: 13% 6% 0;width: 80%;}
	
       						 }
             			 }
			             li:hover{
			                 .bcon{
			                    background:url(../../../resource/images/yxgldb.png) no-repeat;
			                    background-size: contain;
			                 }
			             }
         		}
            }
    }
</style>
