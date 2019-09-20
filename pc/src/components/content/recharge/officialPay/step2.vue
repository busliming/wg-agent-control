<template>
   <div>
      {{inName}}
      <ul class="list_left">
         <li>收款账户:<span>{{inName.payerBank}}</span></li>
         <li>付款人姓名:<span></span></li> 
         <li>收款人银行:<span></span></li> 
         <li>收款人开户地址:<span></span></li> 
         <li>收款人开户行:<span></span></li> 
         <li>转账金额:<span></span></li> 
         <li>转账时间:<span></span></li> 
         <li>转账方式:<span></span></li>  
      </ul> 
   </div> 
</template>

<script>
export default {
    data() {
        return {
            form: [
            {label: '收款账户：', value: '招商银行 8888 8888 8888 8888', editable: 'true'},
            {label: '付款人姓名：', value: 'Ashun', editable: 'true'},
            {label: '收款人银行：', value: '工商银行', editable: 'true'},
            {label: '收款人开户行：', value: '广东省广州市'},
            {label: '收款人开户行：', value: 'Tony Chopper'},               
            {label: '转账金额：', value: '1000 元', editable: 'true'},
            {label: '转账时间：', value: '2018-10-02 00:00:00'},
            {label: '转账方式：', value: '网银转账'}
            ]
        }        
    },
    props:['inName']
    ,
    methods: {
        handleEdit () {}
    }
}
</script>

<style lang="less" scoped>
.list_left{ 
    width:500px;
    li{
        background:#8f7445;
        text-align:right;
    }
}

</style>
