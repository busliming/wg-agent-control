<template>
    <div class="withdraw">
        <div class="withdraw-cont">
            <div class="window-left">
                <h5>帮助中心</h5>
                <ul>
                    <li v-for="(item, idx) in list" :key="idx" :class="{active: parentId === item.parent}" @click="parentId = item.parent">
                        <h6>{{item.title}}</h6>
                        <div class="child">
                            <span v-for="(vv, key) in item.child" :key="key">{{vv.title}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="window-right">
                <ul>
                    <li v-for="(item, idx) in detailList" :key="idx" :class="{active: contId == item.id}" @click="showCont(item.id)">
                        <h6>{{item.title}}</h6>
                        <div class="cont">
                            {{item.txt}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>

<script>
    export default{
        data () {
            return {
                parentId: '1',
                contId: '',
                list: [{
                    title: '新手指导',
                    parent: '1',
                    child: [
                        {title: '如何注册', id: '1'},
                        {title: '如何成为代理', id: '2'},
                        {title: '如何注册', id: '3'}
                    ]
                },{
                    title: '常见问题',
                    parent: '2',
                    child: [
                        {title: '如何注册', id: '4'},
                        {title: '如何成为代理', id: '5'},
                        {title: '如何注册', id: '6'}
                    ]
                }],
                detailList: [
                    {title: '如何注册', id: '1', txt: 'hello how to register,can yo tell me?'},
                    {title: '如何成为代理', id: '2'},
                    {title: '如何注册', id: '3'}
                ]
            }
        },
        methods: {
           showCont (id){
                if (this.contId == id) {
                    this.contId = '';
                } else {
                    this.contId = id;
                }
           }
        },
        created() {
            
        }
    }
</script>

<style scoped lang="less">
    .withdraw{
        background: url(../../../resource/images/bj1.png) no-repeat;
        background-size: cover;
        .withdraw-cont{
            width: 990px;
            margin: 0 auto;
            display: flex;
            position: relative;
            height: 944px;
            padding: 60px 0 60px 210px;
            .window-left{
                width: 210px;
                float: left;
                background: url('../../../resource/images/zdi.png') no-repeat left top;
                position: absolute;
                left: 0;
                top: 55px;
                height: 964px;
                z-index: 100px;
                -webkit-box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                -moz-box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                box-shadow: 10px 0 180px rgba(51, 51, 51, 0.25);
                h5{
                    font-size: 20px;
                    text-align: center;
                    margin: 10px auto;
                    padding: 0;
                    text-align: center;
                    width: 170px;
                    line-height: 60px;
                    height: 65px;
                    background: url(../../../resource/images/hsx.png) center bottom no-repeat;
                }
                li{
                    text-align: center;
                    -webkit-box-shadow: 0px 0px 10px #3a2f19 inset;
                    -moz-box-shadow: 0px 0px 10px #3a2f19 inset;
                    box-shadow: 0px 0px 10px #3a2f19 inset;
                    width: 168px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    border-radius: 9px;
                    height: 50px;
                    overflow: hidden;
                    &.active{
                        height: auto;
                        h6{
                            background: url(../../../resource/images/laniudi.png) center no-repeat;
                            color: #f3d45f;
                        }
                    }
                    h6{
                        background: url(../../../resource/images/aniudi.png) center no-repeat;
                        margin: 0;
                        height: 50px;
                        line-height: 50px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .child{
                        padding: 10px 0;
                        span{
                            display: block;
                            line-height: 35px;
                            color: #f3d45f;
                            cursor: pointer;
                        }
                    }
                }
            }
            .window-right{
                width: 990px;
                background: url('../../../resource/images/ydi.png') no-repeat;
                position: relative;
                ul{
                    margin: 50px 38px;
                    li{
                        border: 1px solid rgba(58, 47, 25, 0.3);
                        -webkit-box-shadow:0 0 8px rgba(0, 0, 0, 0.48);
                        -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.48);
                        box-shadow: 0 0 8px rgba(0, 0, 0, 0.48);
                        margin-top: 20px;
                        background: rgba(58, 47, 25, 0.2);
                        border-radius: 3px;
                        height: 50px;
                        overflow: hidden;
                        &.active{
                            height: auto;
                        }
                        h6{
                            height: 50px;
                            line-height: 50px;
                            background: rgba(58, 47, 25, 0.2) url('../../../resource/images/tubiao.png') 10px center no-repeat;
                            margin: 0;
                            padding-left: 60px;
                            color: #583202;
                            -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
                            -moz-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
                            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
                            font-size: 15px;
                            cursor: pointer;
                        }
                        .cont{
                            padding: 20px;
                            color: #6e3f06;
                        }
                    }
                }
            }
        }
    }
</style>
