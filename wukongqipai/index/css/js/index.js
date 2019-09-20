var htpss = window.location
//判断设备
var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
//swiper
var swiper = new Swiper('.swiper-containerSS', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});



var swipers = new Swiper('.swiper-containerBanner', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer:true,
        observeParents:true,
    });

  $("#codeImg,#codeImgpc").qrcode({
        render: "canvas",                  //table方式
        width: 100,                       //宽度
        height:100,                       //高度
        background: "#ffffff",            //背景颜色
        foreground: "#000",                //前景颜色
        text: "http://www45845.com/" + window.location.search //任意内容
    });

// 右边浮动动画效果
$("#leftFix,#leftH5").Float({'floatRight' : 1, 'topSide' : 200, 'side':0});

$('#closeBox').on('click',function () {
    $('#leftFix').hide();
})
//底部获取域名
$('#footerI').text(window.location.host);