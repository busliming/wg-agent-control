
var oWidth = document.body.clientWidth || document.documentElement.clientWidth;


GetIP().then( function(data){
      $public.geturl(JSON.parse(data).client)
      // $public.apenurl(htp.protocol,'.goGame');  
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
     $public.serviceUrl('.chat,.chatPc').then(  function(c){
              $public.apiqr('#codeImg',c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
              $public.apiqr('#codeImgpc',c); //这是广告图里面的二维码 参数1=id， 参数2=二维码连接地址
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
      
})

 

var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }

// //判断设备
// var sUserAgent = navigator.userAgent.toLowerCase();
// var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
// var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
// var bIsMidp = sUserAgent.match(/midp/i) == "midp";
// var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
// var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
// var bIsAndroid = sUserAgent.match(/android/i) == "android";
// var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
// var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
// if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//     devi = 'mobile'
// } else {
//     devi = 'pc'
// }

// // 监听窗口大小变化
// window.onresize=function(){  
//   var medias = $(window).width() > 750 ? 'pc' : 'mb';
//   if(media != medias){
//     getPicUrl($(window).width());
//     media = medias;
//   }
// }

// 点击游戏列表回到顶部
// $('.main-center').click(function(){
//     scrollTo(0,0);
// })

// 右边浮动动画效果
// $(window).scroll(function(event){
//     var scrollTop = $(window).scrollTop();
// 	$(".floatLoad.pc").stop().animate({top: flTop + scrollTop + 'px'},500);
// });

// 右边浮动动画效果
$(".floatLoad.pc").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});
$('#closeFloat').click(function(){
    $('.floatLoad').hide("slow");
});
$(".chat.phone").Float({'floatRight' : 1, 'topSide' : 400 * window.innerWidth / 750, 'side':0});
$('.phone.bt-fixed').css('height',window.innerWidth / 750 * 156);
function openMailbox(){
  window.open("mail.html?mai="+$public.consultMailbox);
}