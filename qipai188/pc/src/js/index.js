var htpss = window.location

 //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
GetIP().then( function(data){
      $public.geturl(JSON.parse(data).client)
    //   $public.apenurl(htpss.protocol,'#TIMED')
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
     $public.serviceUrl('.serviceUrls').then(  function(c){
             $public.apiqr('#codeImgpc',c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
             $public.apiqr('#codeImg',c); //这是广告图里面的二维码 参数1=id， 参数2=二维码连接地址
              setTimeoutsx()
           })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
    
})



//获取wg支持
function openMailbox(){
    window.open("mail.html?mai="+$public.consultMailbox)
}


// 右边浮动动画效果
$("#leftFix").Float({'floatRight' : 1, 'topSide' : 120, 'side':0});

$("#leftH5").Float({'floatRight' : 1, 'topSide' : 120, 'side':0});

$('#closeBox').on('click',function () {
    $('#leftFix').hide();
})

//底部获取域名
$('#footerI').text(window.location.host);

var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }