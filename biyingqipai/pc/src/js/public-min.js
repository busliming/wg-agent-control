"use strict";
var _createClass = function () {
  function t(t, e) {
    for (var a = 0; a < e.length; a++) {
      var i = e[a];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
  }
  return function (e, a, i) {
    return a && t(e.prototype, a), i && t(e, i), e
  }
}();

function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var htp = window.location,
  Mx = function () {
    function t() {
      _classCallCheck(this, t), this.mapping = [2, 0, 3, 1], this.remapping = [1, 3, 0, 2], this.mov = this.mapping.length
    }
    return _createClass(t, [{
      key: "changeInt",
      value: function (t, e) {
        if (e && 22369621 == t) return 44739242;
        if (!e && 44739242 == t) return 22369621;
        for (var a = 0, i = 0, n = 26 - this.mov / 2; i < 26 / (this.mov / 2); ++i, n -= this.mov / 2) a |= (e ? this.mapping[Math.abs(t % this.mov)] : this.remapping[Math.abs(t % this.mov)]) << n, t >>>= this.mov / 2;
        return a
      }
    }, {
      key: "cryptPwd",
      value: function (t, e) {
        var a = t + ":" + e;
        return md5.create("md5").update(a).hex()
      }
    }]), t
  }(),
  $public = {
    Android: "",
    openAndroid: "",
    iosapi: "",
    openios: "",
    IPURL: "",
    consultMailbox: "",
    timestamp: "",
    auth: "",
    appKey: "",
    cryptPwdfu: function () {
      var t = new Mx,
        e = t.changeInt(this.timestamp, !0),
        a = t.cryptPwd(e, "HWhsZq6zK6KDqgMV");
      this.auth = a
    },
    GetQueryString: function (t) {
      var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
        a = window.location.search.substr(1).match(e);
      return null != a ? unescape(a[2]) : null
    },
    serviceUrl: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#serviceUrl",
        e = this;
      return {
        then: function (a) {
          $.ajax({
            url: "/api/homePage/getSiteGlobConfig",
            type: "post",
            headers: {
              realIp: e.IPURL,
              auth: e.auth,
              timestamp: e.timestamp
            },
            success: function (i) {
              var n = void 0;
              $(t).attr("href", i.data.serviceUrl), e.consultMailbox = i.data.consultMailbox, e.appKey = i.data.appKey, n = "" == i.data.popuUrl || null == i.data.popuUrl ? htp.href : htp.protocol + "//" + i.data.popuUrl + htp.search, a && a(n)
            }
          })
        }
      }
    },
    apiqr: function (t, e) {
      var a = this.GetQueryString("a") || "-1",
        i = e.replace("-1", a).replace("https", "http");
      $(t).qrcode({
        render: "canvas",
        width: 100,
        height: 100,
        background: "#ffffff",
        foreground: "#000",
        text: i
      })
    },
    geturl: function (t) {
      var e = this.GetQueryString("a") || "-1",
        a = this;
      $.ajax({
        url: "api/homePage/getSiteDlInfo?" + (new Date).getTime(),
        type: "post",
        headers: {
          realIp: t,
          auth: a.auth,
          timestamp: a.timestamp
        },
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({
          account: "",
          token: ""
        }),
        success: function (i) {
          for (var n = 0; n < i.data.length; n++) {
            var r = i.data[n].fileUrl.replace("-1", e).replace("ppdl/ip", "ppdl/" + t);
            "Android" == i.data[n].apkType ? (a.Android = r, a.openAndroid = i.data[n].apkName) : "IOS" == i.data[n].apkType && (a.iosapi = r, a.openios = i.data[n].apkName)
          }
        }
      })
    },
    apenurl: function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "#downloaddt",
        a = void 0;
      if (null == this.GetQueryString("pId") || "" == this.GetQueryString("pId")) {
        var i = this.GetQueryString("a") || "-1";
        a = "-1" == i ? "" : "&a=" + i
      } else a = "&pId=" + this.GetQueryString("pId");
      $.ajax({
        url: "api/account/getSiteGameDomainInfo",
        type: "post",
        headers: {
          realIp: this.IPURL,
          auth: this.auth,
          timestamp: this.timestamp
        },
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({
          account: "",
          token: ""
        }),
        success: function (i) {
          $(e).attr("href", t + "//" + i.data.domainUrl + "?siteName=" + i.data.siteName + a)
        }
      })
    },
    ISMobile: function () {
      var t = navigator.userAgent,
        e = t.indexOf("Android") > -1 || t.indexOf("Adr") > -1,
        a = !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      e ? this.h5android() : a && this.h5ios()
    },
    pcios: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "pcios_new",
        e = this,
        a = navigator.userAgent.toLowerCase(),
        i = document.getElementById(t);
      i ? i.click() : $.ajax({
        url: this.iosapi.replace("http://", "//"),
        type: "get",
        success: function (i) {
          var n = document.createElement("a");
          if ("ipad" == a.match(/iPad/i)) {
            var r = "itms-services://?action=download-manifest&url=" + i.replace(".html", ".plist");
            n.setAttribute("href", r.replace("http://", "//"))
          } else n.setAttribute("href", e.openios.replace("http://", "//"));
          n.setAttribute("id", t), n.setAttribute("target", "_self"), document.getElementsByTagName("body")[0].appendChild(n), n.click()
        }
      })
    },
    h5android: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "android_new",
        e = document.getElementById(t);
      e ? e.click() : $.ajax({
        url: this.Android.replace("http://", "//"),
        type: "GET",
        success: function (e) {
          var a = document.createElement("a");
          a.setAttribute("href", e.replace("http://", "//")), a.setAttribute("id", t), a.setAttribute("target", "_self"), document.getElementsByTagName("body")[0].appendChild(a), a.click()
        }
      })
    },
    h5ios: function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "ios_new",
        e = document.getElementById(t);
      e ? e.click() : $.ajax({
        url: this.iosapi.replace("http://", "//"),
        type: "get",
        success: function (e) {
          var a = "itms-services://?action=download-manifest&url=" + e.replace(".html", ".plist"),
            i = document.createElement("a");
          i.setAttribute("href", a.replace("http://", "//")), i.setAttribute("id", t), i.setAttribute("target", "_self"), document.getElementsByTagName("body")[0].appendChild(i), i.click()
        }
      })
    }
  };

function GetIP() {
  return {
    then: function (t) {
      function e(e) {
        $public.IPURL = JSON.parse(e).client, $public.timestamp = JSON.parse(e).timestamp, $public.cryptPwdfu(), t && t(e)
      }
      $.ajax({
        url: "/clientip",
        type: "get",
        success: function (t) {
          e(t)
        },
        error: function (t) {
          $.ajax({
            url: "//clientip.5335cq.com/",
            type: "get",
            success: function (t) {
              e(t)
            },
            error: function (t) {
              $.ajax({
                url: "//clientip.wgqp.net/index.php",
                type: "get",
                success: function (t) {
                  e(t)
                }
              })
            }
          })
        }
      })
    }
  }
}

function Getbaner() {
  return {
    then: function (t) {
      $.ajax({
        url: "/api/picture/getPictureList",
        type: "post",
        headers: {
          realIp: $public.IPURL,
          auth: $public.auth,
          timestamp: $public.timestamp
        },
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: JSON.stringify({
          pictureType: "1"
        }),
        success: function (e) {
          t && t(e)
        }
      })
    }
  }
}
$(function () {
  $("#location_hef").html(htp.host), console.log("2019-05-24-15:17")
});