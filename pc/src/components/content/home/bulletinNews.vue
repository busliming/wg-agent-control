<template>
    <div class="bulletin_box">
          	 <div class="mint">
          	      <div class="icon_left">
          	      	<i></i>
          	      	<span>公告</span>
          	      </div>
          	      <ul :style="{ top }" v-on:mouseenter="enters()" v-on:mouseleave="leaves()">
          	      		<!-- <li v-show="isShow">111111111</li> -->
          	      		<router-link tag="li" v-for="item in prizeList" v-show="isShow" :key="item.id" :to="{path:'/promotions',params:{'id':item.id}}">
          	      		     {{item.noticeContent}}
          	      		</router-link > 
          	      	</ul>
             </div>
    </div>
</template>

<script>
 export default {
    data(){
    	return{
    		prizeList:[], //滚动公告
    		activeIndex: 0,
    		interval:null,
    		isShow:true,

    	}
    },
    methods:{
    	    atime(){
	              if(this.activeIndex < this.prizeList.length) {
		            this.activeIndex += 1;
		             this.isShow=true
		          } else {
		             this.isShow=false
		            this.activeIndex = 0;
		          }
            },
            enters(){
               clearInterval(this.interval);
            },
            leaves(){
	              this.interval = setInterval(_ => {
		  	         this.atime()
	    	      }, 4000);
            },
            getNotice(){
               let self =this;
               // this.$store.dispatch('switch_dialog',self)
               self.$http.post('/api/notice/getNoticeList')
                   .then(function(response) {
                     if(response.data.code=='200'){
						 self.prizeList=response.data.data
                     	//self.$store.dispatch('hide_dialog',self)
                     }
                })
            }
    },
    computed: {
            top() {
              return - this.activeIndex * 40 + 'px';
            },
    },
    mounted(){
          this.interval = setInterval(_ => {
          this.atime()
    	  }, 4000);
    	  this.getNotice()
    }
 }
</script>
<style scoped lang="less">
	@import url('../../../resource/css/css.less');
	  .bulletin_box{
	  	@heights:40px;
	  	background:#a4802c;
	  	height:@heights;
	  	padding: 2px 0;
	  	.mint{
	  		float: inherit;
	  		width:1200px; 
	  		margin: 0 auto;
	  		height:@heights;
	  		background: url(../../../resource/images/ggk.png) no-repeat;
	  		background-size:100% 40px;
	  		overflow: hidden;
	  		.icon_left{ 
	  			float: left;
	  			height:@heights;
	  			width:150px;
	  			color: #cfb896;
	  			span{
                    line-height:@heights;
                    .fololeft(10px)
	  			}
	  			i{
					width:@heights/2;
					height:@heights/2;
					margin-top: @heights/4;
					.fololeft(40px);
					background: url(../../../resource/images/ga.png) no-repeat;
                //  .backgrounds(-329px,-113px);
	  			}
	  		}
	  		ul{
	  			  .fololeft(0px);
	  			  width:calc(100% - 150px);
	  			  padding:0;
	  			  margin: 0;
	  			  position:relative;
	  			  transition: top 0.5s;
	  			  li{
	  			  	line-height:@heights;
	  			  	color: #cfb896;
	  			  	overflow:hidden;
				    text-overflow:ellipsis;
				    white-space:nowrap;
				    cursor:pointer
	  			  }

	  		}
	  	}
	  }

</style>