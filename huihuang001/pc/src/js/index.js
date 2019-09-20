"use strict";

var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
window.onload = function () {
    //监听屏幕宽度设置rem
    if (oWidth < 750) {
        getRem(640, 100);
    }
    // 阻止双击放大
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // 阻止双指放大
    document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
    });
};

window.onresize = function () {
    //监听屏幕宽度设置rem
    if (oWidth < 750) {
        getRem(640, 100);
    }
};

function getRem(pwidth, prem) {
    //监听屏幕宽度设置rem
    var html = document.getElementsByTagName("html")[0];
    html.style.fontSize = oWidth / pwidth * prem + "px";
}
var htp = window.location;

let imgurl = [{
    'picturePc': '../img/banner.jpg',
    'pictureMb': '../img/h5/banner@2x.png'
}, ]

GetIP().then(function (data) {
    $public.geturl(JSON.parse(data).client)
    // $public.apenurl(htp.protocol, '#downloaddt')
    //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
    $public.serviceUrl('#serviceUrl').then(function (c) {
        $public.apiqr('#codeImg', c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
        $public.apiqr('#codeImgpc', c); //这是广告图里面的二维码 参数1=id， 参数2=二维码连接地址
        setTimeoutsx()
    }) //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
    // Getbaner().then(function(data){ 
    //             if(oWidth>750){
    //                       if(data.data.length==0) { //
    //                                for(let i=0;i<imgurl.length;i++){
    //                                    $("#swiper1").append(`
    //                                     <li class = "swiper-slide">
    //                                       <img src="${imgurl[i].picturePc}">
    //                                     </li>`)
    //                                  }
    //                             }else{
    //                                  for(let i=0;i<data.data.length;i++){
    //                                    $("#swiper1").append(`
    //                                     <li class = "swiper-slide">
    //                                       <img src="${data.data[i].picturePc}">
    //                                     </li>`)
    //                                  }
    //                             }
    //                             swip()
    //                       }else{
    //                           if (data.data.length==0) {
    //                                for(let i=0;i<imgurl.length;i++){
    //                                    $("#swiper1").append(`
    //                                     <li class = "swiper-slide">
    //                                       <img src="${imgurl[i].pictureMb}">
    //                                     </li>`)
    //                                }
    //                           }else{
    //                              for(let i=0;i<data.data.length;i++){
    //                                $("#swiper1").append(`
    //                                 <li class = "swiper-slide">
    //                                   <img src="${data.data[i].pictureMb}">
    //                                 </li>`)
    //                              }
    //                           }
    //                           swip()
    //                   }
    // })//banner图回调
})


function openMailbox() {
    window.open("mail.html?mai=" + $public.consultMailbox)
}


// function swip() {
//     //top轮播图实例化
//     var mySwiper = new Swiper('#banner1', {
//         loop: true,
//         autoplay: true,
//         autoplayDisableOnInteraction: false,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true
//         },
//         navigation: {
//             nextEl: '#next1',
//             prevEl: '#prev1'
//         }
//     })
// }

//关闭悬浮窗
function shut_down() {
    $('.serviceBox').fadeOut();
}