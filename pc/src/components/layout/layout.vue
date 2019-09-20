<template>
    <div class="layout">             
        <div class="layout-header">
            <tiny-header></tiny-header>
            <main-nav-bar></main-nav-bar>
        </div> 
        <div class="layout-body">            
            <router-view/>
        </div>        
        <div class="layout-footer">
            <mainFooter></mainFooter>
        </div>
        <div class="Floatinfix">
            <FloaTing></FloaTing>
        </div>               
    </div>
</template>

<script>
import '@/resource/css/css.less'
import '../../resource/css/customize.less'
import mainNavBar from './mainNavBar'
import mainFooter from './mainFooter'
import tinyHeader from './tinyHeader'
import FloaTing from './Floating'
export default {
    data () {
        return {}
    },
    components: {
        tinyHeader,
        mainNavBar,
        mainFooter,
        FloaTing
    }
}

</script>

<style scoped lang="less">
.layout-header{
    display: flex;
    flex-direction: column
}
.Floatinfix{
    position:fixed;
    right:90px;
    bottom:100px;
    z-index: 999;
}
</style>
