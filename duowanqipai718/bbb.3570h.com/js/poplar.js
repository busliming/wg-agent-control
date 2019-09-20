var pIdData = {
    "www.dwqp006.com":"02463370",
    "www.dwqp007.com":"15046282",
    "www.dwqp009.com":"06400138",
    "www.dwqp008.com":"23177354"
} 
function G(n) {
    var e = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != e ? unescape(e[2]) : null
}
var b = document.getElementsByClassName("mohe_down");
    var e = OpenInstall.parseUrlParams();
    let I = pIdData[window.location.hostname]==undefined ? null : pIdData[window.location.hostname];
    e.pId = G("pId") || I
    new OpenInstall({
        appKey:'mcisvt',
        onready: function() {
            var n = this;
            setTimeout(function(){
                n.schemeWakeup();
                n.wakeupOrInstall();
            },3000);
            for (var e = 0; e < b.length; e++)
                b[e].onclick = function() {
                    n.schemeWakeup()
                    n.wakeupOrInstall()
                }
        }
    },e)
