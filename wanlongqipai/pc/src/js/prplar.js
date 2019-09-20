function G(n) {
    var a = window.location.search.substr(1).match(new RegExp("(^|&)" + n + "=([^&]*)(&|$)"));
    return null != a ? unescape(a[2]) : null
}

var data = OpenInstall.parseUrlParams();
data.pId = G("pId"),
new OpenInstall({
    appKey: "m6dqr9",
    onready: function onready() {
        var m = this,
        b = document.getElementsByClassName("mohe_down");
        m.schemeWakeup();
         console.log(111111111)
         // m.wakeupOrInstall();
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

window.onresize = function(){
    getRem(640,100)

};
function getRem(pwidth,prem){
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + "px";
}
getRem(640,100)