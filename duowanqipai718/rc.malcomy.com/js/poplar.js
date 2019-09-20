var pIdData = {
    "www.dwqp511.com":"44411018",
    "www.dwqp611.com":"10856586",
    "www.dwqp711.com":"27633802",
    "www.dwqp811.com":"06662282",
    "www.dwqp322.com":"56993930",
    "www.dwqp522.com":"21637258"
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
