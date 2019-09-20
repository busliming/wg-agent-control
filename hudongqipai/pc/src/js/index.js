 
var oWidth = document.body.clientWidth || document.documentElement.clientWidth;


let imgurl=[
       {'picturePc':'../images/banner.jpg','pictureMb':'../images/phone-banner.jpg'},
]

 if(oWidth>750){
    $("#bannerpc").show()
    $("#bannerH5").hide()
 }else{
   $("#bannerH5").show()
    $("#bannerpc").hide()
 }

GetIP().then( function(data){
      $public.geturl(JSON.parse(data).client)
      // $public.apenurl(htp.protocol,'.goGame') 
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
     $public.serviceUrl('.chat,.chatPc').then(  function(c){
          $public.apiqr('#codeImg',c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
          $public.apiqr('#codeImgpc',c); //这是广告图里面的二维码 参数1=id， 参数2=二维码连接地址
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
      // Getbaner().then(function(data){ //banner图回调 .swiper-container .swiper-wrapper
      //           if(oWidth>750){
      //                   if(data.data.length==0) { //
      //                      for(let i=0;i<imgurl.length;i++){
      //                          $(".swiper-container .swiper-wrapper").append(`
      //                           <li class = "swiper-slide">
      //                             <img src="${imgurl[i].picturePc}">
      //                           </li>`)
      //                        }
      //                   }else{
      //                        for(let i=0;i<data.data.length;i++){
      //                          $(".swiper-container .swiper-wrapper").append(`
      //                           <li class = "swiper-slide">
      //                             <img src="${data.data[i].picturePc}">
      //                           </li>`)
      //                        }
      //                   }
      //                   swip()
      //             }else{
      //                 if (data.data.length==0) {
      //                      for(let i=0;i<imgurl.length;i++){
      //                          $(".swiper-container .swiper-wrapper").append(`
      //                           <li class = "swiper-slide">
      //                             <img src="${imgurl[i].pictureMb}">
      //                           </li>`)
      //                      }
      //                 }else{
      //                    for(let i=0;i<data.data.length;i++){
      //                      $(".swiper-container .swiper-wrapper").append(`
      //                       <li class = "swiper-slide">
      //                         <img src="${data.data[i].pictureMb}">
      //                       </li>`)
      //                    }
      //                 }
      //                   swip()
      //           }
      //       })
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

// 特色轮播图
// var slideData = [{
//         url: '',
//         img: './images/banner1.png'
//     }, {
//         url: '',
//         img: './images/banner2.png'
//     }, {
//         url: '',
//         img: './images/banner3.png'
//     }
// ];
// var vcarousel = new VCarousel({
//     wrap: $('#middleSlide'),
//     data: slideData
// });
$(".floatLoad.pc").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});
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