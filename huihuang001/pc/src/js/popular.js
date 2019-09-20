function G(name) {
    let r = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    if (r != null) return unescape(r[2]);
    return null;
}
var data = OpenInstall.parseUrlParams();
data.pId = G('pId');
$public.serviceUrl().then(function (da) {
    new OpenInstall({
        appKey: da,
        onready: function onready() {
            var m = this,
                b = document.getElementsByClassName("mohe_down");
            m.schemeWakeup();
            for (var i = 0; i < b.length; i++) {
                b[i].onclick = function () {
                    m.wakeupOrInstall();
                    return false
                }
            }
        }
    }, data);
})