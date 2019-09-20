'use strict';

/**
 * Created by Administrator on 2018/1/10.
 * form by ºÃºÃºÃÏÈÉú
 * email 1570302023@qq.com
 *
 *
 *
 */

$(function () {
    $('.bot-img ul li').click(function () {
        var _this = $(this);
        _this.addClass('active').siblings('li').removeClass('active');
        var int = _this.index();
        $('.activeimg').animate({ left: int * -687 }, "slow");
    });
    var list = $('.bot-img ul li').length;
    $('.activeimg').css({
        width: list * 687
    });
    $('.right').click(function () {
        next(list);
    });
    $('.left').click(function () {
        prev(list);
    });
    var timer = '';
    var num = 0;
    timer = setInterval(function () {
        //´ò¿ª¶¨Ê±Æ÷
        num++;
        if (num > parseFloat(list) - 1) {
            num = 0;
            $('.activeimg').animate({ left: num * -687 }, "slow");
        } else {
            $('.activeimg').animate({ left: num * -687 }, "slow");
        }
    }, 5000);
    console.log(1111111)
});
var index = 0;
//ÏÂÒ»ÕÅ
function next(list) {
    if (index < list - 1) {
        index++;
        $('.activeimg').animate({ left: index * -687 }, "slow");
        $('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active');
    } else {
        index = 0;
        $('.activeimg').animate({ left: index * -709 }, "slow");
        $('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active');
    }
}
//        ÉÏÒ»ÕÅ
function prev(list) {
    index--;
    if (index < 0) {
        index = list - 1;
        $('.activeimg').animate({ left: index * -687 }, "slow");
        $('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active');
    } else {
        $('.activeimg').animate({ left: index * -687 }, "slow");
        $('.bot-img ul li').eq(index).addClass('active').siblings('li').removeClass('active');
    }
}

GetIP().then(function (data) {
    // $public.geturl(JSON.parse(data).client)
    // $public.apenurl(htp.protocol, '#downloaddt')
    //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
    $public.serviceUrl('#serviceUrl').then(function (c) {
        $public.apiqr('#qrcode', c); //这是悬浮窗二维码   参数1=id， 参数2=二维码连接地址
        setTimeout(function(){ 
            setTimeoutsx()
        },3000);

    }); //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
});