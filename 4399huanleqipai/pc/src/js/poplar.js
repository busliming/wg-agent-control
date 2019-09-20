function G(n) {
    var e = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != e ? unescape(e[2]) : null
}
var b = document.getElementsByClassName("mohe_down");
    var e = OpenInstall.parseUrlParams();
        e.pId = G("pId") || null;
    new OpenInstall({
        appKey:'sw1s2n',
        onready: function() {
            var n = this;
            for (var e = 0; e < b.length; e++)
                b[e].onclick = function() {
                    return n.schemeWakeup(),
                    n.wakeupOrInstall(),
                    !1
                }
        }
    },e)


