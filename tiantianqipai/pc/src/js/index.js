$(function () {
    GetIP().then(function (data) {
        // $public.geturl(JSON.parse(data).client)
        // $public.apenurl(htp.protocol, '#downloaddt')
        //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
        $public.serviceUrl('#serviceUrl').then(function (c) {
            // $public.apiqr('#qrcode', c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
            setTimeout(function () {
                setTimeoutsx()
            }, 500);
        }); //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
    })

    // 
    var isSafari = (navigator.userAgent.indexOf("Opera") > -1);
    var mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        speed: 500,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },

    })

}) 