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
//swiper 调用必须放在这里

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
     Getbaner().then(function (res){
                if (res.code == '200'){
                    var data = res.data
                    if(data.length>0){
                        $('#banner').empty();
                        for (var i = 0; i<data.length;i++){
                            var imgUrl = data[i].picturePc
                            imgUrl = imgUrl.indexOf('http') !== -1 ? imgUrl : location.protocol + '//' + imgUrl

                            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                                var bannerHtml = '<div class="swiper-slide"><img src='+data[i].pictureMb+' alt=""></div>'
                            } else {
                                var bannerHtml = '<div class="swiper-slide"><img src='+data[i].picturePc+' alt=""></div>'
                            }
                            $('#banner').append(bannerHtml);
                            if(data.length<=1){
                                //只有一张banner时不自动切换
                                //调用swiper
                                var swiper = new Swiper('.swiper-containerBanner', {
                                    slidesPerView: 1,
                                    spaceBetween: 30,
                                    loop: true,
                                    pagination: {
                                        el: '.swiper-pagination',
                                        clickable: true,
                                    },
                                    navigation: {
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    },
                                    observer:true,
                                    observeParents:true,
                                });
                            }else {
                                //调用swiper
                                var swiper = new Swiper('.swiper-containerBanner', {
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
                            }
                        }
                    }
                }
            })
})



//获取wg支持
function openMailbox(){
    window.open("mail.html?mai="+$public.consultMailbox)
}
//获取banner

if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    $('#bannerDefault').attr('src','../images/nnbannerh5.png')
} else {
    $('#bannerDefault').attr('src','../images/nnbannerpc.png')
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