<template>
    <div class="footer">
        <h4 align="center">合作伙伴&nbsp;PARTENRS</h4>
        <div class="partner">            
            <!-- <img style="height: 80px" src="@/resource/images/partner.png">    -->
            <ul>
                <li>
                    <img src="@/resource/images/ylzf.png" alt="">
                    <span>银联支付</span>
                </li>
                <li>
                    <img src="@/resource/images/zf.png" alt="">
                    <span>支付宝支付</span>
                </li>
                <li>
                    <img src="@/resource/images/wxzf.png" alt="">
                    <span>微信支付</span>
                </li>
                <li>
                    <img src="@/resource/images/jdqb.png" alt="">
                    <span>京东钱包</span>
                </li>
                <li>
                    <img src="@/resource/images/bdqb.png" alt="">
                    <span>百度支付</span>
                </li>
                <li>
                    <img src="@/resource/images/QQqb.png" alt="">
                    <span>QQ支付</span>
                </li>
            </ul>
        </div>
        <div class="copyright">
            <span>Copyright 2018 © Huihuangqipai Reserved</span>
            <!-- &nbsp;&nbsp;|&nbsp;&nbsp;
            <router-link to="/help">帮助</router-link> -->
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created() {
            
        }
    }
</script>

<style scoped lang="less">
    .footer{
        height: 200px;
        background-image: url('../../resource/images/dibubj.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-top: 40px;
        h4{
            padding: 0;
            margin: 0;
            color: #886c3c;
            font-size: 18px;
            font-family: FZDHTJW;
        }
        .partner{
            height: 100px;
            background: url('../../resource/images/fg.png') center no-repeat;
            ul{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            li{
                padding: 0 20px;
                color: #886c3c;
                display: flex;
                // line-height: 90px;
                span{
                    display: block;
                    height: 100%;
                    padding-top: 28px;
                }
                img{
                    float: left;
                    margin-right: 5px;
                }
            }
        }
        .copyright {
            color: #fff;
            text-align: center;
            color: #886c3c;
            font-size: 18px;
            font-family: MicrosoftYaHeiLight Regular;
            margin-top: 20px;
            a{
                color: #886c3c;
                &:hover{
                    color: #ad9160;
                }
            }
        }
    }
</style>
