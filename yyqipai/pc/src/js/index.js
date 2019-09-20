 
var oWidth = document.body.clientWidth || document.documentElement.clientWidth;


// let imgurl=[
//        {'picturePc':'../images/banner.jpg','pictureMb':'../images/phone-banner.jpg'},
// ]


GetIP().then( function(data){
      $public.geturl(JSON.stringify(data).client);
      // $public.apenurl(htp.protocol,'.goGame') 
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
     $public.serviceUrl('.chat,.chatPc').then(  function(c){
          $public.apiqr('#codeImg',c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
          $public.apiqr('#codeImgpc',c); //这是广告图里面的二维码 参数1=id， 参数2=二维码连接地址
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
     
})

$("#floatLoad").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});
$(".chat.phone").Float({'floatRight' : 1, 'topSide' : 400 * window.innerWidth / 750, 'side':0});
$('.phone.bt-fixed').css('height',window.innerWidth / 750 * 150);
function openMailbox(){
  window.open("mail.html?mai="+$public.consultMailbox);
}

function shut_down(){
  $('.floatLoad.pc').addClass('swashOut').fadeOut(1600)
}

var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }