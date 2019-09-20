<template>
   <div class="floting">
       <div class="left_bnt">
           <router-link :to="{name:'zfbScanCode',params:{pa:5}}">
              <i class="btn"></i>
          </router-link>
           <a :href="$store.state.getSite.serviceUrl" target="_banck">
                <i class="btn"></i>
            </a>
           <router-link to="/download"><i class="btn"></i></router-link>
           <a href="javascript:vold()" @click="setScroll()"><i class="btn"></i></a>
       </div>
   </div>
</template>

<script>
    export default {
      methods: {
        setScroll() {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      },
      mounted(){
          let self =this;
          self.$http.post('/api/homePage/getSiteGlobConfig')
            .then(function(response) {
               self.$store.commit('getURL',response.data.data);
          })
      }
    }
</script>

<style scoped lang="less">
.left_bnt{
    width: 40px;
    a{
        margin:7px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background:url(../../resource/images/all.png) no-repeat;
        height:40px;
        width: 40px;
        overflow: hidden;
        border-radius: 50%;
        background-position: -260px -108px;
        border: 0 none;
        i{
          background:url(../../resource/images/all.png) no-repeat;
          height:20px;
          width: 20px;
          display: block;
          background-position: -97px -84px;
          margin: -1px -9px;
        }
   /*     i:nth-child(1){
          background-position: -117px -84px;
        }*/

    }
    a:nth-child(2){
      i{
        background-position: -117px -84px;
      }
    }
    a:nth-child(3){
      i{
        background-position: -139px -84px;
      }
    }
    a:nth-child(4){
      i{
        background-position: -160px -84px;
      }
    }
}
</style>
