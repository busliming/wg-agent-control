var pIdData = {
    "www.dwqp055.com":"46246026",
    "www.dwqp066.com":"63023242",
    "www.dwqp077.com":"29468810",
    "www.dwqp088.com":"62761098"
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
                    console.log(111)
                    n.schemeWakeup()
                    n.wakeupOrInstall()
                }
        }
    },e)
