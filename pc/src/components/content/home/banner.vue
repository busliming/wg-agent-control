<template>
    <div class="banner-cont">
        <el-carousel :interval="20000" height="448px" indicator-position="none" >
            <el-carousel-item v-for="item in PictureList" :key="item.label" :class="item.cls">
                <div class="img_box">
                    <img :src="$store.state.httpsv+'//'+item.picturePc" :alt="item.pictureName">
                </div>       
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  data() {
    return {
      PictureList: []
    }
  },
  methods: {
      gettab(){  //获取banner信息
           let self =this;
            self.$http.post('/api/picture/getPictureList',{"pictureType": "1"}).then(response =>{
                self.PictureList=response.data.data
            }) 
      }
  },
  mounted(){
    this.gettab()
  }                  
}
</script>
<style scoped lang="less">
    .banner-cont{
      background: #503d1d;
        .el-carousel__item{
            background: #503d1d;
            .img_box{
                width:100%;
                img{width:100%;height:448px;}
            }
        } 
        & /deep/ .el-carousel__arrow i{
            font-size: 30px;
        }
    }
</style>
