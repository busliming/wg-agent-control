function G(n) {
    var a = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != a ? unescape(a[2]) : null
}
window.onload=function(){
    var data = OpenInstall.parseUrlParams();
    data.pId = G("pId"),
    new OpenInstall({
        appKey: "bgcqzb",
        onready: function onready() {
            var m = this,
            b = document.getElementsByClassName("mohe_down");
            m.schemeWakeup();
            // console.log(111111111)
             m.wakeupOrInstall();
            for (var i = 0; i < b.length; i++) {
                b[i].onclick = function() {
                    console.log(222222)
                    m.wakeupOrInstall();
                    return false
                }
            }
        }
    },
    data);
}

