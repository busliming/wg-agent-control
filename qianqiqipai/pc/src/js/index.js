
GetIP().then( function(data){
      $public.geturl(JSON.parse(data).client)
      // $public.apenurl(htp.protocol, '#TIMED')
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
     $public.serviceUrl('#toServer, .serverUrl').then(  function(c){
          $public.apiqr('#code-img,#codeImg',c); // 二维码
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
     
})
// 客服链接


// 右边浮动动画效果
window.innerWidth > 750 ? $('#server').Float({ floatRight: 1, topSide: 200, side: 50 }) : $('#server').Float({ floatRight: 1, topSide: 200, side: 0 });
$('#closeFloat').click(function(){
    $('.service').hide("slow");
});

// h5进入游戏



// 回到顶部
$('.top').on('click', function() {
  $('html,body').animate({ scrollTop: 0 }, 300)
})
$('#location_hef').html(htp.host);
function openMailbox(){
  window.open("mail.html?mai="+$public.consultMailbox);
}


var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }