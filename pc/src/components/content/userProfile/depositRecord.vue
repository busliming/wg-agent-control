<template>
  <div class="depositRecord">
    <div class="search-bar">
      <span class="label">类型：</span>
      <div class="select-form">
        <div class="dropdown-arrow"></div>
        <select v-model="queryParams.type">
          <option value="">全部</option>
          <option value="0">充值</option>
          <option value="1">提款</option>
        </select>
      </div>
      <span class="label">状态：</span>
      <div class="select-form">
        <div class="dropdown-arrow"></div>
        <select v-model="queryParams.state">
            <option value="">全部</option>
            <option value="1">已完成</option>
            <option value="2">进行中</option>
            <option value="3">已取消</option>
        </select>
      </div>
      <router-link to="">
          <div class="search-btn" @click="getTable"></div>
      </router-link>
      <el-tooltip class="item" effect="light" content="我的信息" placement="top-start"> 
          <div class="icon_click" alt="我的信息" @click="icon_cv">
              
          </div>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="我的教程" placement="top-start">
        <div class="icon_click icon_cli" alt="教程" @click="icon_cli">
            
        </div>
      </el-tooltip>                           
    </div>
    <el-table :data="tableData.list" border style="width: 100%; min-height:480px;background: #b3a073;">
      <el-table-column prop="createDate" label="时间">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型" :formatter="displayType">                
      </el-table-column>

      <el-table-column prop="amount" label="金额" :formatter="displayAmount">              
      </el-table-column>

      <el-table-column prop="state" label="状态" :formatter="displayState">                
      </el-table-column>
    </el-table>
    <div class="custom-pagination pages" id="pages_box">
      <el-pagination
          @current-change="handleCurrentChange"            
          :page-size="tableData.pageSize"
          background
          layout="prev, pager, next, jumper"
          :total="tableData.totalCount">
        </el-pagination>
    </div>
    <el-dialog custom-class="custom-dialog" :visible.sync="mess_x" center>
        <div class="mess_box" v-show="mess_x">
            <div class="mai">
                  <i  @click=closes></i>
                  <p class="tetle"><img src="@/resource/images/userProfile/icon_t.png"><span>教程</span></p>
                  <div class="listbox">
                      <img src="@/resource/images/userProfile/jb.png">
                      <div class="popinf">
                        即日起,加入全民推广活动，向好友分享推荐游戏，即可获得平台返利，推广越多，赢得越多，奖励越多，赶快行动起来吧！
                      </div>
                      <div class="popbottom">
                          <img src="@/resource/images/userProfile/icon_left.png">
                          <p>=所有B产生税收 X 一级返佣比例
                             +所有C产生税收 X 次级返佣比例
                             +所有D产生税收 X 三级返佣比例
                          </p>
                          <ul>
                             <li>A：您自己</li>
                             <li>B：您推广的好友</li>
                             <li>C：B推广的好友</li>
                             <li>D：C推广的好友</li>
                          </ul>
                      </div>
                  </div>
           </div>
        </div>
    </el-dialog>
    <el-dialog custom-class="custom-dialog" :visible.sync="mess_cv" center>    
    <div class="mess_box" v-show="mess_cv">
        <div class="mai" style="top:-10px;">
              <i  @click=closes></i>
              <p class="tetle"><img src="@/resource/images/userProfile/icon.png"><span>我的信息</span></p>
              <div class="listbox">
                   <div class="info_left">
                         <div class="tops">
                              <div class="left_pvc">
                                   <img src="@/resource/images/tu.png">
                                   <p>昵称：<span>{{$store.state.user.nickName}}</span></p>
                              </div>
                              <div class="grade">
                                   <div class="curre">
                                       <img src="@/resource/images/userProfile/curr1.png">
                                       
                                       <img :src="Volume(yMbo.agentLevel)">
                                   </div>
                                   <div class="curre currenext">
                                       <img src="@/resource/images/userProfile/curr2.png">
                                       <img :src="Volume(yMbo.nextAgentLevel)">
                                   </div>
                              </div>
                         </div>
                         <div class="curmiddle">
                            <p>已推广（可返利）人数：<span>{{yMbo.rewardNum}}</span></p>
                            <p>已推广好友昨日总人数：<span>{{yMbo.yNum}}</span></p>
                            <p>昨日税收奖励总金额数：<span>{{yMbo.yMoney}}</span></p>
                            <span>（以上数据每日更新）</span>
                         </div>
                         <span>即日起，保存二维码至相册分享给好友，即可获得返
                               利，赢利越多，税收返利越多，等级越高。您还在等什
                               么？行动起来吧。税收返利每天凌晨自动发送到保险箱。
                        </span>
                   </div>
                   <div class="info_right">
                       <img src="@/resource/images/userProfile/dc.png">
                       <img src="@/resource/images/userProfile/erweim.png">
                       <div><img src="@/resource/images/userProfile/buantcz.png"></div>
                       <div><img src="@/resource/images/userProfile/buantlij.png"></div>
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
        totalCount: '',
        tableData: [],
        yMbo:[],
        mess_x:false,
        mess_cv:false,        
        queryParams: {
          account: '',
          limit: 5,
          offset: 0,
          siteId: '',
          sortOrder: '',
          state: '',
          type: '',
        }
      }
    },
    methods: {
      displayAmount (row) {
        if(row.type == 0) {
          return '+' + row.amount;
        } else if (row.type == 1) {
          return '-' + row.amount;
        }
      },
      displayType(row) {
        if(row.type == '0') {
          return '充值'
        } else if(row.type == '1') {
          return '提款'
        }
      },
      displayState(row){
        var txt = '';
        if (row.state == '1') {
          txt = '已完成';
        } else if (row.state == '2') {
          txt = '进行中';
        } else {
          txt = '已取消';
        }
        return txt;
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
      handleCurrentChange(val) { // 这是调取单个数字
        this.queryParams.offset = (val-1)*5;
        this.getTable();
      },
      getTable() {
        var vm = this;
        this.$http.post('/api/personal/getPayAndDrawRecord', this.queryParams). then(response =>{        
          vm.tableData = response.data.data;  
          vm.totalCount = response.data.data.totalCount;
        })
      },
      getPromot(){
          var vm = this;
          this.$http.post('/api/personal/getPromotionData')
          .then(response =>{
              if(response.data.code==200){
                vm.yMbo = response.data.data.promoterInfo
                
              }    
          })
      }
      ,icon_cli(){
         this.mess_x=true
         this.mess_cv=false
      },
      closes(){
        this.mess_x=false
        this.mess_cv=false
      },
      icon_cv(){
        this.mess_cv=true
        this.mess_x=false
      }
    },
    beforeMount () {
      var user = this.$store.state.user
      this.queryParams.account = user.account;
      this.queryParams.siteId = user.siteId;
      this.getTable();
      this.getPromot()
    }
  }
</script>

<style scoped lang="less" >
.depositRecord {  
  color: #604a19;  
  .search-bar{
    display:flex; margin-bottom: 17px;position: relative;
    span{font-weight: 600; align-self: center;}
    .search-btn{
        border: none; background: url(../../../resource/images/userProfile/sousuo.png) no-repeat;
        width: 91px; height: 29px;
    }
  }
}
.icon_click{
  width:30px;
  height: 30px;
  position: absolute;
  background: url(../../../resource/images/userProfile/icon_xv.png) no-repeat;
  right:40px;
}
.icon_cli{
  background: url(../../../resource/images/userProfile/icon_cv.png) no-repeat;
  right:0;
}

/*这是弹窗后期封装到模块中去*/
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

