function G(name) {
    let r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    if (r != null) return unescape(r[2]); return null;
}
var b = document.getElementsByClassName("mohe_down");
function Op(da){  //获取appkey下载参数
    var data = OpenInstall.parseUrlParams();
    data.pId = G('pId') || 66728426;
    new OpenInstall({
    appKey: da,
        onready: function onready() {
            var m = this;
            for (var i = 0; i < b.length; i++) {
                b[i].onclick = function() {
                    m.schemeWakeup();
                    m.wakeupOrInstall();
                    return false
                }
            }
        }
   }, data)    
}
 function setTimeoutsx(){
    Op($public.appKey)
 }



