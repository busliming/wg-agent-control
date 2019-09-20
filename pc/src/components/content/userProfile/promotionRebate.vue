<template>
    <div class="promotionRebate">
      <!--   <div class="search-bar">
            <div class="select-btn" @click="searchByDate($event, -1)" :class="{'active': (index == -1)}"> {{calcDate(-1)}} </div>
            <div class="select-btn" @click="searchByDate($event, 0)" :class="{'active': (index == 0)}"> {{calcDate(0)}} </div>
            <div class="select-btn" @click="searchByDate($event, 1)" :class="{'active': (index == 1)}"> {{calcDate(1)}} </div>
            <div class="select-btn" @click="searchByDate($event, 2)" :class="{'active': (index == 2)}"> {{calcDate(2)}} </div>
            <div class="select-btn" @click="searchByDate($event, 3)" :class="{'active': (index == 3)}"> {{calcDate(3)}} </div>
            <div class="select-btn" @click="searchByDate($event, 4)" :class="{'active': (index == 4)}"> {{calcDate(4)}} </div>
            <div class="select-btn" @click="searchByDate($event, 5)" :class="{'active': (index == 5)}"> {{calcDate(5)}} </div>
        </div> -->
        <el-table :data="tableData.lowerList" border style="width: 100%;min-height:480px;background: #b3a073;">
            <el-table-column :label="calcDate(0)+ ';  总计：'">
                <el-table-column prop="date" label="日期">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="vipId" label="玩家ID">                
                </el-table-column>
                <el-table-column prop="nickName" label="会员昵称">              
                </el-table-column>
                <el-table-column prop="level" label="推广等级">                
                </el-table-column>
                <el-table-column prop="userLevel" label="几级会员">              
                </el-table-column>
                <el-table-column prop="money" label=" 税收">
                </el-table-column>
                <el-table-column prop="reward" label=" 返利">
                </el-table-column>
                <el-table-column prop="lowerNum" label=" 下级人数">
                </el-table-column>
                <!-- <el-table-column prop="details" label="查看">
                    <template slot-scope="scope">
                        <el-button size="mini" plain @click="handleEdit(scope.$index,scope.row)">查看下级</el-button>                    
                    </template>
                </el-table-column> -->
            </el-table-column>
        </el-table>
        <div class="custom-pagination pages" id="pages_box">
            <el-pagination
            @current-change="handleCurrentChange"            
            :page-size="tableData.pageSize"
            background
            layout="prev, pager, next, jumper"
            :total="tableData.maxLen">
            </el-pagination>
        </div>
        <el-dialog custom-class="custom-dialog" :visible.sync="mess_cv" center>    
                <div class="mess_box" v-show="mess_cv">
                    <div class="mai" style="top:-40px;">
                          <i  @click=closes></i>
                          <p class="tetle"><img src="@/resource/images/userProfile/icon.png"><span>我的下级</span></p>
                          <div class="listbox">
                               <div class="info_left">
                                     <div class="tops">
                                          <div class="left_pvc">
                                               <img src="@/resource/images/tu.png">
                                               <p>昵称：<span>{{xjuser.nickName}}</span></p>
                                          </div>
                                          <div class="grade">
                                               <div class="curre">
                                                   <img src="@/resource/images/userProfile/curr1.png">
                                                   
                                                   <img :src="Volume(xjuser.level)">
                                               </div>
                                          </div>
                                     </div>
                                     <div class="curmiddle">
                                        <p>已推广（可返利）人数：<span>{{xjuser.lowerNum}}</span></p>
                                        <p>昨日税收奖励总金额数：<span>{{xjuser.reward}}</span></p>
                                        <span>（以上数据每日更新）</span>
                                     </div>
                    
                               </div>
                          </div>
                   </div>
                </div>
    </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            tableData: [],
            totalCount: '',
            index: 0,
            mess_cv:false,
            xjuser:[]       
        }
    },
    methods: {
        searchByDate(e, index) {
            this.index = index;
            this.getTable(10,0,e.target.innerText);
        },
        handleCurrentChange(val) { // 这是调取单个数字
            this.getTable(10,val,this.calcDate(this.index));
        },
        closes(){
            this.mess_cv=false
        },
        Volume(value){
            switch(value){
                case '青铜': 
                return require('../../../resource/images/userProfile/curre1.png');
                case '白银': 
                return require('../../../resource/images/userProfile/curre2.png');
                case '黄金': 
                return require('../../../resource/images/userProfile/curre3.png');
                case '钻石': 
                return require('../../../resource/images/userProfile/curre4.png');
            }
      },
        handleEdit(INDEX,ro){
            this.mess_cv=true
            this.xjuser=ro
          console.log(INDEX,ro)    
        },
        calcDate(num) {
            var today = new Date();
            var date = new Date(today);
            date.setDate(today.getDate() + num);
            var calc = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate();
            return calc
        },
        getTable(lim,foosets,dtext) {
            var vm = this;
            this.$http.post('api/personal/getPromotionJunior',{
                account:vm.$store.state.user.account,
                limit:lim,
                offset:foosets,
                playId:vm.$store.state.user.playId,
                queryDate:dtext,
                siteId: vm.$store.state.user.siteId,
                sort: '',
                sortOrder: '',
                endDate: '',
                startDate: ''
            }). then(response =>{        
                vm.tableData = response.data.data;
            })
        }
    },
    beforeMount () {
        this.getTable(10,0,this.calcDate(0));
    }

  }
</script>

<style lang="less">
    .promotionRebate{
        .search-bar{
            font-family: SimHei Regular;
            display: flex; flex-flow: row wrap; justify-content: center;
            .select-btn{
            width: 134px; height: 34px; margin: 0 5px;
            background-image: linear-gradient(-30deg, #dfab57 0%, #b4792d 53%, #c38b31 75%,#d29d35 100%), 
            linear-gradient(#d09d2b, #d09d2b);
            background-blend-mode: normal, normal;
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.35);
            border-style: solid;
            border-width: 1px;
            border-image-source: linear-gradient(180deg, #ff8504 0%, #ffed04 50%, #ffb704 74%, #ff8104 100%);
            border-image-slice: 1;
            display: flex; justify-content: center; align-items: center;
            color: #f2fa12;
            }
            .select-btn:hover, .active{
            background-image: linear-gradient(-30deg, #ffb10b 0%,#db8517 53%, #e89718 75%, #f4a918 100%), 
            linear-gradient(#d09d2b, #d09d2b);
            -webkit-box-shadow: 0px 0px 5px 2px rgba(163,114,62,1);
            -moz-box-shadow: 0px 0px 5px 2px rgba(163,114,62,1);
            box-shadow: 0px 0px 5px 2px rgba(163,114,62,1);
            }
        }
    }
.mess_box{
  width: 699px;
  height:500px;
  .mai{
    position:relative;
    text-align:center;
    top: -20px;
    i{
      width:37px;
      height:37px;
      background: red;
      display: block;
      position: absolute;
      right: 15px;
      top: 35px;
      background: url(../../../resource/images/safeMoney/chu.png);
    }
    .tetle{
      margin: 0;
      text-align: center;
      font-size:25px;
      color: #ffc627;
      line-height: 66px;
      img{
          vertical-align: middle;
          margin-right: 10px;
          margin-top: -5px;
      }
    }
    .listbox{
       >img{
        margin-top:10px;
       }
       .popinf{
        background: url(../../../resource/images/userProfile/jux.png) no-repeat;
        height:48px;
        width: 509px;
        margin:20px auto;
        padding:5px 20px;
        color: #ffebb2;
        text-align: left;
        font-size: 14px;
        line-height: 20px;
      }
      .popbottom{
        overflow: hidden;
        width: 509px;
        margin: 0 auto;
         img{ float: left;}
         p{
          float: left;
          width: 275px;
          color: #ffe7ab;
          font-size:17.71px;
          margin: 0;
          line-height: 22px;
          font-family:"黑体";
         }
         ul{
          float:right;
          text-align: left;
          font-size:14px;
          color: #ffe7ab;
         }
      }
      .info_left{
        float: left;
        width: 350px;
        margin-left:70px;
        >span{
          margin-top:10px;
          font-size: 14px;
          color: #fbdf9d;
          text-align: left;
          display: inline-block;
          line-height:26px;
        }
        .tops{
           margin-top:10px;
           background: #c5a54a;
           overflow: hidden;
           padding:10px;
           border-radius:8px;
           .left_pvc{
               float:left;
               text-align: left;
               width:150px;
               >img{width:150px;}
               p{
                margin: 0;
                color: #583302;
                font-size: 17px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap
               }
           }
          .grade{
              float: left;
              width: 140px;
              margin-left:40px;
                .curre{
                  border:solid 1px #fae68a;
                  padding:5px 0;
                  border-radius: 5px;
                }
               .currenext{
                 margin-top: 5px;
               }  
          }
        }
        .curmiddle{
            margin-top: 10px;
            background: url(../../../resource/images/userProfile/curmiddle.png) no-repeat;
            width: 331px;
            height:91px;
            padding:6px 10px 5px;
            p{
              margin: 0;
              text-align: left;
              line-height:24px;
              font-size: 17px;
              color: #fbdf9d;
            }
            >span{
              font-size: 14px;
              color: #fbdf9d;
            }

        }
      }
      .info_right{
        margin-left: 20px;
        padding-top: 10px;
        width: 190px;
        float: left;
      } 
    }
  }
}    
</style>
