function openMailbox(){  //跳转邮箱页面
  window.open("mail.html?mai="+$public.consultMailbox)
}
function shut_down(){
  $('#server').addClass('swashOut').fadeOut(1600)
}
let oWidth = document.body.clientWidth || document.documentElement.clientWidth;


GetIP().then( function(data){
       $public.geturl(JSON.parse(data).client)
      //  $public.apenurl(htp.protocol,'#TIMED')  8-16
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
       $public.serviceUrl('.serverUrl').then(function(c){
       $public.apiqr('#code-img,#codeImg,#qrcode',c)
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
})




// 右边浮动动画效果
$('#server').Float({ floatRight: 1, topSide: 200, side: 0 })



// 回到顶部
$('.top').on('click', function() {
  $('html,body').animate({ scrollTop: 0 }, 300)
})


var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }