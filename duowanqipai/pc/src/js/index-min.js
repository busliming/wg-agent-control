"use strict";$(function(){$(".bot-img ul li").click(function(){var i=$(this);i.addClass("active").siblings("li").removeClass("active");var e=i.index();$(".activeimg").animate({left:-687*e},"slow")});var i=$(".bot-img ul li").length;$(".activeimg").css({width:687*i}),$(".right").click(function(){next(i)}),$(".left").click(function(){prev(i)});var e=0;setInterval(function(){++e>parseFloat(i)-1?(e=0,$(".activeimg").animate({left:-687*e},"slow")):$(".activeimg").animate({left:-687*e},"slow")},5e3)});var index=0;function next(i){index<i-1?(index++,$(".activeimg").animate({left:-687*index},"slow"),$(".bot-img ul li").eq(index).addClass("active").siblings("li").removeClass("active")):(index=0,$(".activeimg").animate({left:-709*index},"slow"),$(".bot-img ul li").eq(index).addClass("active").siblings("li").removeClass("active"))}function prev(i){--index<0?(index=i-1,$(".activeimg").animate({left:-687*index},"slow"),$(".bot-img ul li").eq(index).addClass("active").siblings("li").removeClass("active")):($(".activeimg").animate({left:-687*index},"slow"),$(".bot-img ul li").eq(index).addClass("active").siblings("li").removeClass("active"))}GetIP().then(function(i){$public.serviceUrl("#serviceUrl").then(function(i){setTimeoutsx()})});