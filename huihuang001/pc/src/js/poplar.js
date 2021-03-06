"use strict";

function G(name) {
    var r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    if (r != null) return unescape(r[2]);return null;
}
var b = document.getElementsByClassName("mohe_down");
function Tp() {
    if (window.location.protocol == 'http:') {
        return window.location.href.replace('http://', '');
    } else {
        return window.location.href.replace('https://', '');
    }
}
function Op(da) {
    //获取appkey下载参数
    var data = OpenInstall.parseUrlParams();
    if (G('pId') == null) {
        data.doMain = Tp();
    } else {
        data.pId = G('pId');
        data.doMain = Tp();
    }
    // if(data.pId){
    //      if(isNaN(data.pId) || data.pId.length!=8){
    //         console.log('不规则的推广参数')
    //        return false;
    //      }
    // }
    new OpenInstall({
        appKey: da,
        onready: function onready() {
            var m = this;
            m.schemeWakeup();
            for (var i = 0; i < b.length; i++) {
                b[i].onclick = function () {
                    if (isApple) {
                        if (isBaidu) {
                            opensafari();
                            $('#open_safari').fadeIn();
                            return false;
                        }
                    }
                    m.schemeWakeup();
                    m.wakeupOrInstall();
                    return false;
                };
            }
        }
    }, data);
}
function setTimeoutsx() {
    if (G('pId') == null) {
        //判断当前浏览器是否有pld有推广参数调用第三方下载
        if (G('a') == null) {
            //判断当前浏览器是否有a（老的推广方式）没有的情况下使用第三方下载
            Op($public.appKey);
        } else {
            for (var i = 0; i < b.length; i++) {
                //使用的是以前老的推广方式下载(a=11222)
                b[i].onclick = function () {
                    $public.ISMobile();
                };
            }
        }
    } else {
        Op($public.appKey);
    }
}