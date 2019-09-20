<template>
    <div class="main-nav-bar">
        <div class="nav-cont" id="nav-conts">
            <router-link to="/">           
                <span class="icon index-icon"></span>
                <span class="label">首页</span>        
            </router-link>
            <router-link to="/game/2">       
                <span class="icon card-game"></span>
                <span class="label">棋牌游戏</span>     
            </router-link> 
            <router-link to="/game/3">        
                <span class="icon fish-game"></span>
                <span class="label">捕鱼游戏</span>               
            </router-link>
            <router-link to="/game/4">         
                <span class="icon video-game"></span>
                <span class="label">电玩街机</span>            
            </router-link>
            <router-link to="/promotions">        
                <span class="icon activity-icon"></span>
                <span class="label">优惠活动</span>      
            </router-link>
            <router-link to="/download">      
                <span class="download-icon"></span>
                <span class="label">手机下注</span> 
            </router-link>
            <a :href="$store.state.getSite.serviceUrl" target="_banck">
                <span class="helpdesk-icon"></span>
                <span class="label">在线服务</span> 
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "1"
        };
    },
    methods: {
        
    }
};
</script>

<style scoped lang="less">
@import url('../../resource/css/css.less');
    .main-nav-bar{
        background: #a4802c;
        text-align: center;
        // font-family: SimHei regular;
        font-size: 18px; 
        .nav-cont{           
            height: 67px; width: 1200px; margin: 0 auto;
            display: flex; justify-content: space-evenly;  
            a{
                width: 187px; height: 100%;   
                color: rgb(255, 228,102); 
                display:flex; flex-direction: row; justify-content: center;
                .icon{   
                    background-image: url('../../resource/images/all.png');   
                    background-repeat: no-repeat; 
                    margin-right: 6px;   
                    align-self: center;                              
                }
                .label{         
                    align-self: center;
                }
            }
            a:hover{
                background: linear-gradient(0deg,#966d0c,#cb7c0a);
                background-color: #cb7c0a;
            }
            .index-icon{                
                background-position: -137px -111px;
                width: 31px; height: 28px;
            }
            .card-game{
                background-position: -98px -111px;
                width: 31px; height: 32px;
            }
            .fish-game{
                background-position: -135px -150px;
                width: 36px; height: 33px;
            }
            .video-game{
                background-position: -176px -111px;
                width: 34px; height: 31px;
            }
            .activity-icon{
                background-position: -99px -151px;
                width: 28px; height: 30px;
            }
            .download-icon{
                background: url('../../resource/images/header/xiazhu.png') no-repeat;
                width: 23px; height: 34px;
                margin-right: 6px;   
                align-self: center;
            }
            .helpdesk-icon{
                background: url('../../resource/images/header/kefu.png') no-repeat;
                width: 30px; height: 33px;
                margin-right: 6px;   
                align-self: center;   
            }
        }
    }
#nav-conts .router-link-exact-active{
   background: linear-gradient(0deg,#966d0c,#cb7c0a);
}        
</style>

