// JavaScript Document
 (function($){
    $.fn.myScroll = function(options){
    //Ĭ������
    var defaults = {
        speed:35,  //�����ٶ�,ֵԽ���ٶ�Խ��
        rowHeight:60//ÿ�еĸ߶�
    }; 
    var opts = $.extend({}, defaults, options),intId = []; 
    function marquee(obj, step){    
        obj.find("ul").animate({
            marginTop: '-=1'
        },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }       
        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);
            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });
    }
})(jQuery);
 
   $(document).ready(function(){      
        $("div.list_lh").myScroll({
            speed:35, //��ֵԽ���ٶ�Խ��
            rowHeight:60//li�ĸ߶�
        });
    })