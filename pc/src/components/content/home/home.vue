<template>
    <div class="wrapper">                 
        <banner class="banner"></banner> <!-- 轮播图 -->
        <bulletin-news></bulletin-news>  <!-- 新闻组件 -->
        <div class="main-content">           
            <div class="content_box">
                <el-row :gutter="0" style="margin: 0;">
                        <el-col :span="18" style="padding-right: 20px;">                
                            <div class="grid_content" id="grid_content">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane value="3" data="4" name="first" class="tab_list">
                                        <span slot="label"><i class="tab_icon"></i>棋牌游戏</span>
                                        <div class="tab_content">
                                             <ul class="game_list">
                                                 <li v-for="(item, idx) in list" :key="idx">
                                                      <a href="javascript:void()" @click="goGame(item)" class="bcon">
                                                          <!-- <span>{{item.gameUrl}}</span> -->
                                                          <img :src="$store.state.httpsv+'//'+item.gameImgUrl">
                                                         <el-button></el-button>
                                                      </a>
                                                 </li>
                                             </ul>
                                        </div>    
                                    </el-tab-pane>
                                    <el-tab-pane value="2" data="4" label="捕鱼游戏" name="second" class="tab_list">
                                        <span slot="label"><i class="tab_icon"></i>捕鱼游戏</span>
                                        <div class="tab_content">
                                             <ul class="game_list">
                                                 <li v-for="(item, idx) in list" :key="idx">
                                                      <a href="javascript:void()" @click="goGame(item)" class="bcon">
                                                          <!-- <span>{{item.gameUrl}}</span> -->
                                                          <img :src="$store.state.httpsv+'//'+item.gameImgUrl">
                                                         <el-button></el-button>
                                                      </a>
                                                 </li>
                                             </ul>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane value="1" data="4" label="电玩街机" name="third" class="tab_list">
                                        <span slot="label"><i class="tab_icon"></i>电玩街机</span>
                                        <div class="tab_content">
                                             <ul class="game_list">
                                                 <li v-for="(item, idx) in list" :key="idx">
                                                      <a href="javascript:void()" @click="goGame(item)" class="bcon" :data-id="item.id">
                                                          <!-- <span>{{item.gameUrl}}</span> -->
                                                          <img :src="$store.state.httpsv+'//'+item.gameImgUrl">
                                                         <el-button></el-button>
                                                      </a>
                                                 </li>
                                             </ul>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
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
    import banner from './banner' 
    import bulletinNews from './bulletinNews' 
    import sideBar from './sideBar'
    export default {
        data () {
            return { 
                list:[], //游戏列表
                listnotice:'', //公告列表
                activeName: 'first',
                loading:null
            }
        },
        components: {          
            banner,
            bulletinNews,            
            sideBar          
        },
        methods: {
            handleClick(tab) {
               // this.openFullScreen()
                this.gettab(tab.$attrs.value,tab.$attrs.data,1)
            },
            goGame (item) {
                var user = this.$store.state.user;
                if (user) {
                    var url = '//'+item.gameDomainUrl + '?token=' + user.token + '&stationMark='+user.stationMark + '&gameId=' + item.gameId;
                    window.open(url)
                } else {
                    this.$Message({
						message: '请先登入',
						type: 'error',
						customClass: 'custom-message',
						center: true,
						duration: 3000
					})
                }
            },
            gettab(Ty,mit,of){  //获取游戏信息
               let self =this;
               // this.$store.dispatch('switch_dialog',self)
                self.$http.post('/api/game/getSiteGameList',{
                       "gameType":Ty,
                        "limit":mit,
                        "offset":of
                })
                .then(function(response) {
                    if(response.data.code !== '200') return;
                    self.list=response.data.data.rows
                   // self.$store.dispatch('hide_dialog',self)
                });
            }
        },
        mounted(){
          this.gettab(3,4,1)
        }
    }
</script>

<style scoped lang="less">
@import url('../../../resource/css/css.less');
.main-content{
    background:url(../../../resource/images/bj1.png) no-repeat;
    height: 523px;
    overflow: hidden;
    .content_box{
          width: 1200px;
          margin: 10px auto;
          span{color: #ffe466;}
          .tab_icon{
                width:28px;
                display: inline-block;
                height:28px;
                vertical-align: middle;
                margin:0 5px;
                .backgrounds(-300px,-83px);
          }
          #tab-second .tab_icon{
            background-position:-180px -82px;
          }
          #tab-third .tab_icon{
            background-position: -240px -82px;
          }
          #tab-first.is-active .tab_icon{
             background-position: -330px -83px;
          }
          #tab-second.is-active .tab_icon{
             background-position: -210px -83px;
          }
          #tab-third.is-active .tab_icon{
             background-position: -270px -81px;
          }
          .game_list{
            margin: 0 5px;
            padding:0;
            overflow: hidden;
              li{
                width:calc(100%/4);
                float: left;
                position: relative;
                .bcon{
                   /*margin:0 5px;*/
                   background:url(../../../resource/images/yxdb.png) no-repeat;
                   height: 386px;
                   background-size: contain;
                   display: block;
                   img{margin: 5% 3% 0; width: 94%;}
                   button{
                    /*.backgrounds(-271px,-40px);*/
                    background:url(../../../resource/images/ljryx.png) no-repeat;
                    width: 102px;
                    height: 44px;
                    margin: 10px auto 0;
                    display: block;
                    border: 0 none;
                    background-size: cover;
                    position: absolute;
                    left: 50%;
                    bottom: 25px;
                    transform: translateX(-50%);
                   }
                }
              }
              li:hover{
                 .bcon{
                    background:url(../../../resource/images/yxgldb.png) no-repeat;
                    background-size: contain;
                    button{
                        background:url(../../../resource/images/jryxpt.png) no-repeat;
                        background-size: cover;
                        /*background-position: -388px -41px;*/
                    }
                 }
              }
          }
    }
}
</style>
<style type="text/css">
#grid_content .el-tabs__header{margin: 0;}
#grid_content .el-tabs__content{padding-top:20px;border: solid 1px #93701f; height:407px;    border-top: 0 none;background: #503d1c;}
#grid_content .el-tabs__nav{width:100%;height: 56px;background:url(../../../resource/images/jianbiandi.png);}
#grid_content .el-tabs__item{padding:0;width:calc(100%/3);text-align:center;line-height: 56px;height: 56px;}
#grid_content .el-tabs__active-bar{display:none;}
#grid_content .el-tabs__item.is-active{background:url(../../../resource/images/all.png);background-position: -100px -228px;color:#503d1d;}
#grid_content .el-tabs__item.is-active span{color:#503d1d;}
</style>

