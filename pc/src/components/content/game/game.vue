<template>
    <div class="game">
        <div class="gm-banner" v-if="PictureList.length > 0">
                <router-link :to="PictureList[0].linkUrl ? '/' : '/'">
                     <img :src="$store.state.httpsv+'//'+PictureList[0].picturePc">
                </router-link>
        </div>
        <div class="gm-list">
            <div v-if="datangth" style="position: absolute; width:100%;">
                   <img style="width:100%; margin:0;padding:0;" src="../../../resource/images/phots.png" height="495" width="844">
            </div> 
            <div class="list-cont">
                <ul> 
                    <li v-for="(item, idx) in list.rows" :key="idx">
                        <a href="javascript:void()" @click="goGame(item)" :data-id="item.id" style="display: inline-flex;width:100%">
                            <div class="gm-list-img">
                                <img :src="$store.state.httpsv+'//'+item.gameSmallImg" :alt="item.gameName">
                            </div>
                            <div class="gm-list-detail">
                                <h5></h5>
                                <div class="cont">{{item.gameContent}}</div>
                                <div class="go-game"></div>
                            </div>
                       </a> 
                    </li>
                </ul>
            </div>
            <div class="pages" id="pages_box" v-if="pages">                    
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :page-sizes="[6,9,12,15]"
                    :page-size="list.limit"
                    layout=" prev, pager, next,sizes,jumper"
                    :total="list.total">
                    </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
        data () {
            return { 
                list:[], //游戏列表
                pages:false,
                datangth:true,
                perpages:6,
                PictureList:[],
            }
        },
        methods: {
              handleSizeChange(val) { //这是一页显示多少个
                 this.gettab(this.$route.params.type,val,1)
                 this.perpages=val
                },
                handleCurrentChange(val) { // 这是调取单个数字
                this.gettab(this.$route.params.type,this.perpages,val)
              },
            goGame (item) {
                var user = this.$store.state.user;
                if (user) {
                    var url = '//'+item.gameDomainUrl + '?token=' + user.token + '&stationMark='+user.stationMark + '&gameId=' + item.gameId;
                    window.open(url)
                } else {
                    this.$Message.error('请先登入');
                }
            },
             getbaner(par){  //获取banner信息
               let self =this;
                self.$http.post('/api/picture/getPictureList',{
                    "pictureType":par
                }).then(response =>{
                    if (response.data.code == '200'){
                        self.PictureList=response.data.data
                    }
                }) 
            }, 
            gettab(Ty,mit,current){  //获取游戏信息
              // this.openFullScreen()
               let self =this;
                self.$http.post('/api/game/getSiteGameList',{
                       "groupId":Ty,
                        "limit":mit,
                        "offset":current
                })
                .then(function(response) {
                    if (response.data.code !== '200') return;
                    self.list=response.data.data;
                    if(response.data.data.rows.length >= mit){
                        self.pages=true
                    }
                    if (response.data.data.rows.length>0) {
                        self.datangth=false
                    }if (response.data.data.rows.length==0) {
                        self.datangth=true
                    }

                });
            }
        },
        mounted(){
          this.gettab(this.$route.params.type,9,1)
          this.getbaner(this.$route.params.type)
        },
        watch:{
           $route(to,from){
                this.gettab(to.params.type,9,1)
                this.getbaner(this.$route.params.type)
           }
        },
}       
</script>

<style lang="less">
    .game{
        .gm-banner{
            display:grid;
            a{
                img{
                    display: block;
                    width: 100%;
                    margin: 0;
                }
            }
        }
        .gm-list{
            background: url(../../../resource/images/bj1.png) no-repeat;
            background-size: cover;
            min-height:520px;
            .list-cont{
                width: 1200px;
                margin: 0 auto;
                min-height:520px;
                ul{
                    margin: 0 -5px;
                    display: flex;
                    flex-wrap: wrap;
                    padding-top: 10px;
                    li{
                        box-sizing: border-box;
                        width: 392px;
                        height: 210px;
                        display: flex;
                        margin: 12px 5px 0;
                        padding: 15px;
                        background: url(../../../resource/images/gmdiban.png) center top no-repeat;
                        background-size: 100%;
                        &:hover{
                            background: url(../../../resource/images/ldb.png) center top no-repeat;
                        }
                        .gm-list-img{
                            width: 180px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            margin-right: 5px;
                            img{
                                width: 100%;
                                max-height: 100%;
                            }
                        }
                        .gm-list-detail{
                            width: 70%;
                            height: 100%;
                            position: relative;
                            h5{
                                height: 20px;
                                margin: 0;
                                padding: 0;
                                margin-bottom: 20px;
                                background: url(../../../resource/images/txtb.png) no-repeat left 5px;
                            }
                            .cont{
                                font-size: 14px;
                                color: #fff;
                                height: 95px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 5;
                                -webkit-box-orient: vertical;
                            }
                            .go-game{
                                background: url(../../../resource/images/jryx.png) no-repeat center;
                                height: 28px;
                                width: 88px;
                                position: absolute;
                                top: 140px;
                                right: 0;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .custom-pagination{
            .el-pagination__jump{color: #f6d55b;}            
        }
    }
</style>

