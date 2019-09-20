<template>
    <div name="step3" id="step3">
            <h2>扫码充值</h2>
                <div class="status"> 
            
                    <h5><strong>操作成功</strong></h5>
                    <p>预计两小时内完成充值</p>
                </div>
                <div class="listxs">
                     <label>订单号：</label>
                     <p>{{ins}}</p>
                </div>
                <div class="listxs">
                     <label>转账金额：</label>
                     <p>{{nat}}</p>
                </div>
  </div>          
</template>

<script>
export default {
    props:["ins","nat"]

}
</script>

<style lang="less" scoped>
#step3{
    margin-top: -20px;
    h2{
       color: #ffcd13;
    font-weight: 400;
    width: 715px;
    height: 80px;
    text-align: center;
    margin: 0 auto;
    line-height: 80px;
    font-size: 32px;
    border-bottom: solid 1px #533c12;
    text-shadow: black 0.1em 0.1em 0.2em; 
    }
    .status{
        padding:50px 0 20px;
        text-align: center;
        strong{
            color: #5a3201;
            font-size: 26px;
            font-weight:500;
        }
        p{
            color: #563202;
        }
    }
    .listxs{
        width: 715px;
        margin: 0 auto;
         label{
            width: 30%;
            text-align: right;
            float: left;
            display: block;
            color: #5b3204;
            font-size: 20px;
            line-height: 49px;
            font-weight: 600;
        }
        p{
            position: relative;
            font-size: 14px;
            margin-left: 30%;
            color: #fec81e;
            height: 50px;
            padding-left: 10px;
            line-height: 50px;
            font-size: 20px;
            background: url(../../../../resource/images/leftnav/srk.png) no-repeat;
        }
    }
}
</style>
