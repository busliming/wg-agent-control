<template>
    <div class="promotions">
        <div class="banner">
            <router-link :to="item.linkUrl ? '' : '/'" v-for="item in PictureList" :key="item.index">
                     <img :src="$store.state.httpsv+'//'+item.picturePc">
            </router-link>
        </div>
        <div class="main-content" style="position:relative;">
            <div v-if="datangth" style="position: absolute; width:100%;">
              <img style="width:100%; margin:0;padding:0;" src="../../../resource/images/phots.png" height="495" width="844">
            </div>          
            <div class="content_box"> 
                 <ul>
                     <li v-for="(item,index) in datalist.rows" :key="index" :class="{actives:show_==index}">
                         <img :src="$store.state.httpsv+'//'+item.activityPcurl" :alt="item.activityName">
                         <div class="Detailsk" @click="counter(index)">
                         </div>
                         <div class="down" v-show="show_==index">
                              <div class="remarkbox">
                                         <div class="border_tite">
                                              活动详情
                                         </div>
                                         {{item.remark}}
                              </div>
                              <div class="submit_box">
                                  <el-button @click="submit(item.id)">
                                      领取奖励
                                  </el-button>
                                  <a @click="counter(index)">收起</a>
                              </div>
                         </div>
                     </li>
                 </ul>
            </div>
            <div class="pages" id="pages_box" v-if="pages">                    
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :page-sizes="[3,6,9,12]"
                    :page-size="datalist.limit"
                    layout=" prev, pager, next,sizes,jumper"
                    :total="datalist.total">
                    </el-pagination>
            </div>       
        </div>         
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_:null,
            pcurls:require('../../../resource/images/porlist.png'),
            datalist:[
            ],
            pages:false,
            datangth:true,
            PictureList:[],
        };
    },
    methods: {
        handleSizeChange(val) { //这是一页显示多少个
        this.gettab(0,val,1)
        },
        handleCurrentChange(val) { // 这是调取单个数字
        this.gettab(0,3,val)
        },
        counter(i){
            if(i==this.show_){
                this.show_=null
            }else{
                this.show_=i
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
         gettab(Ty,mit,of){  //获取游戏信息
              // this.openFullScreen()
               let self =this;
                self.$http.post('/api/activity/getSiteActivityList',{
                       "activityId":Ty,
                        "limit":mit,
                        "offset":of
                })
                .then(function(response) {
                    self.datalist=response.data.data
                    if(response.data.data.rows.length >= mit){
                       self.pages=true
                    }
                    if (response.data.data.rows.length>0) {
                       self.datangth=false
                   }

                })
        },
        submit(ids){ //领取活动
                let self = this
               if(this.$store.state.user){
                    self.$http.post('/api/activity/bonus/getSiteActivityBonus',{
                          "account":self.$store.state.user.account, //账号
                          "accountId": self.$store.state.user.id,
                          "activityId":ids ,
                    }).then(response =>{
                        if (response.data.code == '200'){
                            self.$MessageBox.alert(response.data.data, '领取成功', {
                              confirmButtonText: '确定',
                              type: 'success',
                              customClass: 'custom-messageBox',
                            })  
                        }
                    })
                }else{
                    self.$Message({
                        message: '请先登入',
                        type: 'error',
                        customClass: 'custom-message',
                        center: true,
                        duration: 2000
                    })
                } 
        }
    },
     mounted(){
          this.gettab(0,3,1)
          this.getbaner(5)
        },
}
</script>

<style lang="less">
.promotions{
    .banner{
        overflow: hidden;
        img{margin-top: -1px;margin-bottom: -14px;width:100%;}
    }
    .main-content{
        background-image:url(../../../resource/images/bj1.png);
        /*height: 723px;*/
        overflow: hidden;
            .content_box{
            width: 1200px;
            margin: 10px auto;
            min-height:600px;
            li{
                margin-bottom:10px;
                position: relative;
                overflow: hidden;
                .Detailsk{
                    position: absolute;
                        width: 150px;
                        height: 200px;
                        top: -1px;
                        right: -3px;
                        background-position: center;
                    background-image:url(../../../resource/images/niu.png);
                    background-repeat: no-repeat;
                }
                img{
                    width:auto;
                    margin-left: -10px;
                }
                .remarkbox{
                    padding:60px 150px;
                    .border_tite{
                        width: 169px;
                        height: 49px;
                        background:url(../../../resource/images/Detailsk_boeder.png) no-repeat;
                        line-height: 49px;
                        text-align: center;
                        margin: 0 auto;
                        color: #704f02;
                        font-size: 24px;
                    }
                }
                .down{
                    padding: 0px 0px 20px 0;
                    width: calc(100% - 35px);
                    margin-top: -50px;
                }
                .submit_box{
                    text-align: center;
                    .el-button{
                      background:url(../../../resource/images/safeMoney/ann.png) no-repeat ;
                      width: 112px;
                      height:38px;
                      background-size:cover;   
                      border: 0 none;
                      color: #703803;
                    }
                    a{
                        display: block;
                        color: #ffeb07;
                        font-size: 20px;
                        line-height:40px;
                    }
                }
            }
            .actives{
               .down{
                background:url(../../../resource/images/Detailsk_bj.png) #b39f7e;
               }

            }  

        }
    }    
    .custom-pagination{
        .el-pagination__jump{color: #f6d55b;}            
    }
}
</style>

