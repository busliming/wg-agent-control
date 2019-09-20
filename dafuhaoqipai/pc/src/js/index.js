// let imgurl=[
//        {'picturePc':'../images/banner.jpg','pictureMb':'../images/h5/banner.jpg'},
// ]



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
    //  Getbaner().then(function(data){ //banner图回调 swiper-wrapper-top
    //          if(oWidth>750){
    //                     if(data.data.length==0) { //
    //                        for(let i=0;i<imgurl.length;i++){
    //                            $(".swiper-wrapper-top").append(`
    //                             <li class = "swiper-slide">
    //                               <img src="${imgurl[i].picturePc}">
    //                             </li>`)
    //                          }
    //                     }else{
    //                          for(let i=0;i<data.data.length;i++){
    //                            $(".swiper-wrapper-top").append(`
    //                             <li class = "swiper-slide">
    //                               <img src="${data.data[i].picturePc}">
    //                             </li>`)
    //                          }
    //                     }
    //                     swip()
    //               }else{
    //                   if (data.data.length==0) {
    //                        for(let i=0;i<imgurl.length;i++){
    //                            $(".swiper-wrapper-top").append(`
    //                             <li class = "swiper-slide">
    //                               <img src="${imgurl[i].pictureMb}">
    //                             </li>`)
    //                        }
    //                   }else{
    //                      for(let i=0;i<data.data.length;i++){
    //                        $(".swiper-wrapper-top").append(`
    //                         <li class = "swiper-slide">
    //                           <img src="${data.data[i].pictureMb}">
    //                         </li>`)
    //                      }
    //                   }
    //                     swip()

    //           }
    //       });//banner图回调
})

  // function swip(){ //top轮播图实例化
  //     var mySwiper = new Swiper ('.swiper-container', {
  //           slidesPerView: 1,
  //           spaceBetween: 30,
  //           loop: true,
  //           observer:true,
  //           observeParents:true,
  //           pagination: {
  //               el: '.swiper-pagination',
  //               clickable: true,
  //           },
  //           autoplay: {
  //               delay: 2500,
  //               disableOnInteraction: false,
  //           }
  //     })
  // }

// 静态轮播图
// var swiper = new Swiper('.swiper-container-bottom', {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     observer:true,
//     observeParents:true,
//     autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//     },
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });
// 点击关闭浮窗
$('.close').click(function(){
    $('.floatLoad.pc').hide('slow');
})
// 右边浮动动画效果
$("#floatLoad").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});
// 动态网址
$('#location_hef').html(htp.host);
// 动态底部高度距离
$(".chat.phone").Float({'floatRight' : 1, 'topSide' : 400 * window.innerWidth / 750, 'side':0});

// //判断设备
// let sUserAgent = navigator.userAgent.toLowerCase();
// let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
// let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
// let bIsMidp = sUserAgent.match(/midp/i) == "midp";
// let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
// let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
// let bIsAndroid = sUserAgent.match(/android/i) == "android";
// let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
// let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
// if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//     devi = 'mobile'
// } else {
//     devi = 'pc'
// }

// window.onresize=function(){  
//   let medias = $(window).width() > 750 ? 'pc' : 'mb';
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