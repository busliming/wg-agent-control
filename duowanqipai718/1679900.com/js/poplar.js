var pIdData = {
    "www.dwqp001.com": "24221322",
    "www.dwqp002.com": "09541258",
    "www.dwqp003.com": "17929866",
    "www.dwqp005.com": "28153482"
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
        },3000)
        for (var e = 0; e < b.length; e++)
            b[e].onclick = function () {
                n.schemeWakeup()
                n.wakeupOrInstall()
            }
    }
}, e);
