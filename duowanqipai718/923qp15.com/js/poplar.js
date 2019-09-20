var pIdData = {
    "www.dwqp33.com": "12424842",
    "www.dwqp22.com": "08492682",
    "www.dwqp011.com": "04298378",
    "www.dwqp000.com": "20027018"
}

function G(n) {
    var e = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != e ? unescape(e[2]) : null
}
var b = document.getElementsByClassName("mohe_down");
var e = OpenInstall.parseUrlParams();
let I = pIdData[window.location.hostname] == undefined ? null : pIdData[window.location.hostname];
e.pId = G("pId") || I
new OpenInstall({
    appKey: 'mcisvt',
    onready: function () {
        var n = this;
        setTimeout(function(){
            n.schemeWakeup();
            n.wakeupOrInstall();
        },3000);
        for (var e = 0; e < b.length; e++)
            b[e].onclick = function () {
                n.schemeWakeup()
                n.wakeupOrInstall()
            }
    }
}, e)
