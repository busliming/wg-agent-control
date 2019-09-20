var pIdData = {
    "www.dwqp011.com":"42051722",
    "www.dwqp022.com":"25274506",
    "www.dwqp033.com":"00108682",
    "www.dwqp044.com":"16885898"
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
