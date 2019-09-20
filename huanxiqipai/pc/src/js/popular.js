"use strict";
function G(a) {
	var e = window.location.search.substr(1).match(new RegExp("(^|&)" + a + "=([^&]*)(&|$)"));
	return null != e ? unescape(e[2]) : null
}
var data = OpenInstall.parseUrlParams();
data.pId = G("pId") || "",
new OpenInstall({
	appKey: "v81p4e",
	 mask:function(){
         return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,1);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
    },
	onready: function() {
		var a = this,
		e = document.getElementsByClassName("mohe_down");
		a.schemeWakeup();
		a.wakeupOrInstall();
		for (var n = 0; n < e.length; n++) e[n].onclick = function() {
			return a.wakeupOrInstall(),
			!1
		}
	}
},
data);