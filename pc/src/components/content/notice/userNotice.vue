<template>
    <div class="user-notice">
        <div class="content-box">
            <div class="side-bar">
                <div class="icon-box">
                    <div class="bell-icon"></div>
                    <div class="box-label" name="我的提醒"></div>
                </div>
            </div>
            <div class="main-content">
                <div class="header">
                    <div class="btn-group">
                        <router-link to="">
                            <div class="btn" :class="{'active': (msgFilter == '0' || msgFilter == '')}" @click="getMsgList()">全部</div>
                        </router-link>
                        <router-link to="">
                            <div class="btn" :class="{'active': (msgFilter == '1')}" @click="getMsgList('1')">未读</div>
                        </router-link>      
                    </div>
                    <router-link to="">
                        <div class="label" name="全部设为已读">                        
                        </div>
                    </router-link>                    
                </div>
                <div class="body">
                    <img src="@/resource/images/userNotice/xiaox.png" alt="" v-if="msgList.length < 1">
                    <el-collapse v-model="activeNames" accordion>
                        <div class="tab" v-for="item in msgList" :key="item.noticeId">
                            <div class="tools">
                                <router-link to="">查看</router-link>
                                <div class="separator"></div>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-if="item.isRead == '1'" @click.native="readMsg(item.noticeId)">设为已读</el-dropdown-item>
                                        <el-dropdown-item @click.native="deleteMsg(item.noticeId)">删除</el-dropdown-item>                                       
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <el-collapse-item :name="item.index">
                                <template slot="title">
                                    <div class="tab-header" :class="{'unread': (item.isRead == '1')}">
                                        <div class="title">{{item.noticeTitle}}</div>
                                        <div class="time">{{item.createDate}}</div>                                    
                                    </div>                                
                                </template>
                                <div class="tab-content">                                
                                    {{item.noticeContent}}
                                </div>
                            </el-collapse-item>
                        </div>         
                    </el-collapse>     
                    <div class="pagination" v-if="totalCount > 5">                    
                        <el-pagination
                        background
                        @current-change="handleCurrentChange"      
                        :page-size="5"
                        layout=" prev, pager, next, jumper"
                        :total="totalCount">
                        </el-pagination>
                    </div>    
                </div>                  
            </div>
        </div>        
    </div>
</template>

<script>
  export default {
    data() {
        return {
            msgFilter: '', // '' = 所有, '1' = '未读'
            activeNames: ['1'],
            msgList: [],        
            totalCount: 0, 
            totalUnread: 0,                
            queryParams: {
                account: '',
                limit: 5,
                offset: 0,
                unRead: ''
            }
        };
    },
    // watch: {
    //     msgList: function() {
    //         var vm = this;
    //         var params = {
    //             account: this.queryParams.account,
    //             limit: 5,
    //             offset: 0,
    //             unRead: 1
    //         }
    //         this.$http.post('/api/notice/getMyNoticeList', params).then(response => {
    //             vm.totalUnread = response.data.data.total; //获取未读信息数量
    //         })
    //     }
    // },
    methods: {
        handleCurrentChange (val) {
            this.queryParams.offset = (val-1)*this.queryParams.limit;
            this.getMsgList();
        },  
        getMsgList (type) {
            var vm = this;
            if (type) {
                this.queryParams.unRead = type; // (type = 1): 未读, (type = 0 || '') : 所有    
                this.msgFilter = type;
            } else {
                this.queryParams.unRead = '';
                this.msgFilter = '';
            }
            this.$http.post('/api/notice/getMyNoticeList', this.queryParams).then(response => {
                // vm.msgList = response.data.data.rows;  
                vm.totalCount = response.data.data.total; 
            })
        },
        readMsg (id) {
            var param = {noticeId: id};
            var vm = this;
            this.$http.post('/api/notice/notice/setMsgStatus', param).then(response => {
                if (response.data.code == "200") {                  
                    vm.getMsgList();
                }                
            })
        },
        deleteMsg (id) {
            var vm = this;
            var param = {noticeId: id};
            this.$http.post('/api/notice/notice/deleteMsg', param).then(response => {
                if (response.data.code == "200") {
                    this.$Message({
                        message: response.data.code,
                        type: 'success'
                    });
                    vm.getMsgList();
                }                
            })
        }
    },
    beforeMount () {
        var user = this.$store.state.user;
        this.queryParams.account = user.account;
        this.getMsgList();   
    }
}
</script>

<style lang="less" scoped>
.user-notice{
    height: auto;
    min-height: 60uv; max-height: 120uv;
    background:url(../../../resource/images/bj1.png) no-repeat;
    background-position: bottom;
    background-color: #503d1d;
    display: flex;
    .content-box{
        margin: 40px auto 40px auto; width: 1200px; height: 90%; min-height: 560px;  
        background: url(../../../resource/images/userNotice/ydi.png);
        display: flex;
        font-family: MicrosoftYahei Regular;
        .side-bar{
            width: 225px;
            background: url(../../../resource/images/userNotice/zdi.png) 100%;
            .icon-box{
                display:flex; flex-direction: column;
                background: url(../../../resource/images/userNotice/dik.png) no-repeat; 
                width: 220px; height: 136px; margin-top: 61px;
                .bell-icon{
                    background: url(../../../resource/images/userNotice/xing.png) no-repeat; 
                    width: 58px; height: 58px; margin: 19px auto 0 auto;
                }
                .box-label{
                    background: url(../../../resource/images/userNotice/x.png) no-repeat; 
                    width: 132px; height: 38px; margin: 13px auto 0 auto;
                }
            }
        }
        .main-content{
            width: 900px; margin: 61px 33px; min-height: 500px;            
            .header{
                display: flex; align-items: flex-end;
                border-bottom: #543f14 1px solid; padding-bottom: 10px;
                .btn-group{
                    width: 100%; 
                    font-size: 18px; color: #FFC81F; font-weight: bold;
                    text-align: center;
                    display: flex; 
                    a, .el-dropdown-link{color:inherit}
                    a:active{color:#ffffff}
                    .btn{
                        background: url(../../../resource/images/userNotice/jk1.png) no-repeat; 
                        width: 95px; height: 47px; margin-right: 10px; padding: auto;  display: flex;
                        align-items: center;  justify-content: center
                    } 
                    .btn:hover, .active{
                        background: url(../../../resource/images/userNotice/jk.png) no-repeat; 
                    }                    
                }
                .label{
                    background: url(../../../resource/images/userNotice/yd.png) no-repeat; 
                    min-width: 131px; height: 27px;
                }
            }    
            .body{                
                display: flex; justify-content: center; align-items: center;        
                height: 100%;                
                .tab{
                    position: relative;
                    border: #7b6847 1px solid; border-radius: 5px; margin-top: 20px;              
                    -webkit-box-shadow: 2px 2px 30px 2px rgba(0,0,0,0.3);
                    -moz-box-shadow: 2px 2px 30px 2px rgba(0,0,0,0.3);  
                    box-shadow: 2px 2px 30px 2px rgba(0,0,0,0.3);
                    .tools{
                        position: absolute; right:10px; top:25px;
                        display: flex; align-items: center; font-weight: 600;
                        a, .el-dropdown-link{
                            margin: auto 5px; 
                            color: #583202; font-size: 16px; font-weight: bold;
                        }
                        a:hover, .el-dropdown-link:hover{color:#fdc720}
                        .separator{
                            background: url(../../../resource/images/userNotice/g.png) no-repeat; 
                            width: 1px; height: 16px;
                        }
                    }  
                    .tab-header{
                        display:flex; align-items: center; height: 100%;
                        color:#583202;     
                        .title{
                            font-size: 18px; margin-left: 27px;
                        }
                        .time{
                            font-size:14px; position: absolute;
                            left: 50%; top: 30px;
                            transform: translate(-50%, -50%);
                        }
                                    
                    }
                    .unread{
                        font-weight: bold; color: #fdc720;
                    }
                    .tab-content{
                        margin-left: 27px;margin-top:30px;
                        color:#583202; font-size: 15px;
                    }
                }
                .tab:hover{
                    -webkit-box-shadow: 2px 2px 30px 2px rgba(176,146,82,0.8);
                    -moz-box-shadow: 2px 2px 30px 2px rgba(176,146,82,0.8);
                    box-shadow: 2px 2px 30px 2px rgba(176,146,82,0.8);
                }   
            }
        }
    }
}
</style>
<style>
    .el-collapse-item__header, .el-collapse-item__wrap{background:inherit; background-color: rgb(110,83,34,0.2)}
    .el-collapse-item__header, .el-collapse, .el-collapse-item__wrap { border:none }
    .el-collapse{font-family: MicrosoftYahei Regular;}
    .el-collapse-item__arrow, .el-popper .popper__arrow{display: none}    
    .el-dropdown-menu{
        background-color: rgba(176,146,82,0.9);
        border: #7b6847 1px solid; border-radius: 5px;  
        -webkit-box-shadow:  2px 2px 30px 2px rgba(0,0,0,0.3);
        -moz-box-shadow: 2px 2px 30px 2px rgba(0,0,0,0.3);               
        box-shadow: 2px 2px 30px 2px rgba(0,0,0,0.3);       
    }
    .el-popper .popper__arrow{background: inherit}
    .el-collapse-item__header,.el-collapse-item__header.is-active{
        background-color: rgb(28,18,0,0.2); 
        height: 60px ;border-bottom: #7b6847 1px solid; border-radius: 5px;
    }
     .el-dropdown-menu__item:not(.is-disabled):hover,.el-dropdown-menu__item:hover{
        color: #e7ca0c; background: rgb(137,104,27,0.7)
    }
</style>
