function G(name) {
    let r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    if (r != null) return unescape(r[2]); return null;
}
var b = document.getElementsByClassName("mohe_down");
function Op(da){  //获取appkey下载参数
    var data = OpenInstall.parseUrlParams();
    data.pId = G('pId');
    new OpenInstall({
    appKey: da,
        onready: function onready() {
            var m = this;
            m.schemeWakeup();
            for (var i = 0; i < b.length; i++) {
                b[i].onclick = function() {
                    m.wakeupOrInstall();
                    return false
                }
            }
        }
   }, data)    
}
$public.serviceUrl('#toServer, .serverUrl').then(function(da){
       if(G('pId')==null){  //判断当前浏览器是否有pld有推广参数调用第三方下载
            if(G('a')==null){  //判断当前浏览器是否有a（老的推广方式）没有的情况下使用第三方下载
                 Op(da)
            }else{
                for (var i = 0; i < b.length; i++) {  //使用的是以前老的推广方式下载(a=11222)
                    b[i].onclick = function() {
                      $public.ISMobile()
                    }
                }
            }  
       }else{
         Op(da)
       }
})