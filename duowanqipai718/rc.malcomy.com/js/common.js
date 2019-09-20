var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function (a, b, c) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("String.prototype.startsWith", function (a) {
    return a ? a : function (a, c) {
        var b = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        var e = b.length,
            g = a.length;
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var f = 0; f < g && c < e;)
            if (b[c++] != a[f++]) return !1;
        return f >= g
    }
}, "es6", "es3");
var inIp = "",
    span = 2E4;
$(document).ready(function () {
    $("img.lazyload").lazyload();
    clip();
    baidu_init();
    downloadWelcome();
    getInIp()
});

function urlParamRe(a, b) {
    a = a.match(new RegExp("(^|&)" + b + "=([^&]*)(&|$)"));
    return null != a ? unescape(a[2]) : null
}

function getUrlParam(a) {
    var b = decodeURI(window.location.search.substr(1));
    return urlParamRe(b, a)
}

function getV() {
    var a = getUrlParam("v");
    a = parseInt(a);
    if (null == a || isNaN(a)) a = span;
    return a
}

function isWeixin() {
    return !!/MicroMessenger/i.test(navigator.userAgent)
}

function isIOS() {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

function isPc() {
    var a = navigator.userAgent.toLowerCase(),
        b = "ipad" == a.match(/ipad/i),
        c = "iphone os" == a.match(/iphone os/i),
        d = "midp" == a.match(/midp/i),
        e = "rv:1.2.3.4" == a.match(/rv:1.2.3.4/i),
        g = "ucweb" == a.match(/ucweb/i),
        f = "android" == a.match(/android/i),
        h = "windows ce" == a.match(/windows ce/i);
    a = "windows mobile" == a.match(/windows mobile/i);
    return !(b || c || d || e || g || f || h || a)
}

function clip() {
    var a = {
        encode: "base64",
        pid: getV(),
        TS: Date.parse(new Date) + "" + Math.floor(10 * Math.random())
    };
    a = Base64.encode(JSON.stringify(a));
    $(".image_div").attr("data-clipboard-text", a);
    $("#bottom").attr("data-clipboard-text", a);
    new ClipboardJS(".image_div");
    new ClipboardJS("#bottom")
}

function getInIp() {
    var a = new(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)({
            iceServers: []
        }, {
            optional: [{
                RtpDataChannels: !0
            }]
        }),
        b = setInterval(function () {
            if (null != a.localDescription) {
                var c = a.localDescription.sdp.split("\r\n");
                for (x in c) {
                    var d = c[x];
                    d.startsWith("c=IN IP4 ") && (d = d.substring(9), checkInIp(d) && (inIp = d, clearInterval(b)))
                }
            }
        }, 100);
    a.createDataChannel("");
    a.createOffer().then(function (c) {
        a.setLocalDescription(c, function () {}, function () {
            clearInterval(b)
        })
    })
}

function checkInIp(a) {
    return /[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(a) && !("0.0.0.0" == a || a.startsWith("127.") || a.startsWith("169.254"))
}

function download(a) {
    if (isWeixin() && (showWx(), !isIOS())) return;
    var b = window.devicePixelRatio,
        c = window.screen.width * b;
    b *= window.screen.height;
    if (b > c) {
        var d = c;
        c = b;
        b = d
    }
    c = {
        ID: getV(),
        InIP: inIp,
        Width: c,
        Height: b,
        TS: Date.parse(new Date)
    };
    b = 0;
    switch (getUrlParam("p")) {
        case "100":
            b = 2;
            break;
        case "010":
            b = 1;
            break;
        case "001":
            b = 3;
            break;
        case "110":
            b = 0;
            break;
        case "101":
            b = isIOS() ? 3 : 2;
            break;
        default:
            b = 0
    }
    $.ajax({
        type: "GET",
        url: getUrlHost() + "/download?data=" + Base64.encode(JSON.stringify(c)) + "&type=" + b,
        success: function (b) {
            a(b)
        }
    })
}

function baidu_init() {
    $("body").append('<script type="text/javascript" src="https://hm.baidu.com/hm.js?809bfa1fbd25f0a73d5500eeca3a1c69">\x3c/script>')
}

function getUrlHost() {
    return window.location.protocol + "//" + window.location.host
}

function vios() {
    $("img.lazyload").lazyload();
    isWeixin() && showWx();
    var a = Base64.decode(getUrlParam("msg"));
    window.location.href = a
}

function downloadWelcome() {
    1 == getUrlParam("dl") && ($("#phone_context").hide(), $("#bottom").hide(), $("#dl_welcome").show())
};