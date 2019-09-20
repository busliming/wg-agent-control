
    var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("ios").style.display="block";
    }else{
         document.getElementById("ios").style.display="none";
    }


$(".kefu").Float({'floatRight' : 1, 'topSide' : 300, 'side':0});   

GetIP().then(function (data) {
    //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
      $public.serviceUrl('#serviceUrl').then(function (c) {
          $public.apiqr('#qrcode', c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
          setTimeoutsx()
      }) //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
  });

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false); 

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
})(document, window);