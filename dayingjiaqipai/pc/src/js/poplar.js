"use strict";
function G(n) {
    var e = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != e ? unescape(e[2]) : null
}
var b = document.getElementsByClassName("mohe_down");
function Op(n) {
    var ed = OpenInstall.parseUrlParams();
    if (ed.pId = G("pId") || null,
    ed.doMain = window.location.hostname,
    ed.pId && (isNaN(ed.pId) || 8 != ed.pId.length))
        return console.log("不规则的推广参数"),
        !1;
    new OpenInstall({
        appKey: n,
        onready: function() {
            for (var n = this, e = 0; e < b.length; e++)
                b[e].onclick = function() {
                    alert(ed.doMain)
                    return n.schemeWakeup(),
                    n.wakeupOrInstall(),
                    !1
                }
        }
    },ed)
}
function setTimeoutsx() {
    if (null == G("pId"))
        if (null == G("a"))
            Op($public.appKey);
        else
            for (var n = 0; n < b.length; n++)
                b[n].onclick = function() {
                    $public.ISMobile()
                }
                ;
    else
        Op($public.appKey)
}