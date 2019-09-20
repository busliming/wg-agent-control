$.fn.Float = function (A) {
  var B = this;
  var C = {
    topSide: 150,
    floatRight: 1,
    side: 5,
    init: function () {
      var D = B,
        F = navigator.userAgent;
      D.css({
        "position": "absolute",
        "z-index": "1000",
        "top": this.topSide
      });
      if (F.toLowerCase().indexOf("360se") > -1) {
        this.isBlock = true
      } else {
        if (F.toLowerCase().indexOf("theworld") > 0) {
          this.isBlock = true
        }
      }
      this.floatRight == 1 ? D.css("right", this.side) : D.css("left", this.side);
      var E = this;
      setInterval(function () {
        E.lock.call(E)
      }, 20);
      if (this.close != undefined) {
        this.closeFloat()
      }
    },
    lockTop: function (F, H, D, I, G) {
      var E = F.css("top");
      var J = I.top + G.topSide,
        L = (J - parseInt(E)) / 20;
      if (this.isBlock) {
        L = (J - parseInt(E))
      }
      var K = parseInt(E) + L;
      if ((K + H.height) < D.height) {
        F.css("top", K)
      }
    },
    lockLeft: function (D, I, G) {
      var F = D.css("left");
      var H = I.left + G.side,
        E = (H - parseInt(F)) / 20;
      D.css("left", parseInt(F) + E)
    },
    lockRight: function (D, J, H) {
      var E = D.css("right");
      var G = document;
      if (J.left == 0) {
        var I = H.side,
          F = (Math.abs(I) - Math.abs(parseInt(E))) / 20;
        D.css("right", Math.abs(parseInt(E)) + F)
      } else {
        var I = J.left - H.side,
          F = (Math.abs(I) - Math.abs(parseInt(E))) / 20;
        E = -(Math.abs(parseInt(E)) + F) + "px";
        D.css("right", E)
      }
    },
    lock: function () {
      var D = B,
        G = this.currentPosition(D),
        E = this.windowDimension(),
        H = this.scrollPosition(),
        I = this.pageDimension(),
        F = this;
      this.lockTop(D, G, I, H, F);
      if (this.floatRight == 1) {
        this.lockRight(D, H, F)
      } else {
        this.lockLeft(D, H, F)
      }
      if (this.isBlock) {
        if (this.lastTop != D.css("top")) {
          D.css("visibility", "hidden");
          this.lastTop = D.css("top")
        } else {
          D.css("visibility", "visible")
        }
      }
    },
    currentPosition: function (D) {
      var E = D.offset();
      return {
        top: E.top,
        left: E.left,
        width: D.outerWidth(),
        height: D.outerHeight()
      }
    },
    windowDimension: function () {
      if ((typeof innerWidth != "undefined" && innerWidth != 0) && (typeof innerHeight != "undefined" && innerHeight != 0)) {
        return {
          width: innerWidth,
          height: innerHeight
        }
      }
      var D = document;
      return {
        width: Math.min(D.body.clientWidth, D.documentElement.clientWidth),
        height: Math.min(D.body.clientHeight, D.documentElement.clientHeight)
      }
    },
    scrollPosition: function () {
      var D = document;
      return {
        top: Math.max(D.body.scrollTop, D.documentElement.scrollTop),
        left: Math.max(D.body.scrollLeft, D.documentElement.scrollLeft)
      }
    },
    pageDimension: function () {
      var D = document;
      return {
        width: Math.max(D.body.scrollWidth, D.documentElement.scrollWidth),
        height: Math.max(D.body.scrollHeight, D.documentElement.scrollHeight)
      }
    },
    closeFloat: function () {
      B.find("#" + this.close).click(function () {
        B.hide()
      }).css("cursor", "pointer")
    }
  };
  if (A) {
    $.extend(C, A)
  }
  C.init()
};