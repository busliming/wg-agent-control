let imgurl=[
       {'picturePc':'../images/banner.png','pictureMb':'../images/h5/banner.png'},
]



var oWidth = document.body.clientWidth || document.documentElement.clientWidth;

 if(oWidth>750){
    $("#bannerpc").show()
    $("#bannerH5").hide()
 }else{
   $("#bannerH5").show()
    $("#bannerpc").hide()
 }
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
// 点击关闭浮窗
$('.close').click(function(){
    $('.floatLoad.pc').hide('slow');
})
// 右边浮动动画效果
$(".floatLoad.pc").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});
// 动态网址
$('#location_hef').html(htp.host);
// 动态底部高度距离
$(".chat.phone").Float({'floatRight' : 1, 'topSide' : 400 * window.innerWidth / 750, 'side':0});

