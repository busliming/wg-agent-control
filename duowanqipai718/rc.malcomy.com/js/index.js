function showWx() {
    $("#phone_context").hide();
    var a = $("#JweixinTip");
    isIOS() ? a.attr("src", "https://cdn.57piao.com/res/images/v3_ios3/ios_wx.jpg") : a.attr("src", "https://cdn.57piao.com/res/images/v3_ios3/android_wx.jpg");
    a.show()
}

function showloading() {
    $("#over").show();
    $("#layout").show();
    download(success)
}

function success(a) {
    if (isIOS()) {
        var b = getUrlParam("p");
        null != b && 0 == b.charAt(b.length - 1) ? window.location.href = a : (a = Base64.encode(a), window.location.href = "./index2.html?msg=" + a)
    } else window.location.href = a;
    $("#over").hide();
    $("#layout").hide()
}
$(document).ready(function () {
    !isWeixin() && isIOS() && "1" == getUrlParam("fix") && showFix();
    isPc() && (genQRCode("#code_div", window.location.href), $(".dl_ios").hide(), $(window).scroll(function () {
        var a = $(this).scrollTop() + 250;
        $("#qr_code").css({
            position: "absolute",
            top: a + "px",
            left: "8%"
        })
    }));
    "1" == getUrlParam("d") && showloading();
    "20437" == getV() && $("body").append('<script type="text/javascript" src="https://s23.cnzz.com/z_stat.php?id=1277363602&web_id=1277363602">\x3c/script>');
    var a = getUrlParam("t");
    null != a ?
        $("#first_page").attr("src", "https://cdn.57piao.com/res/images/v3_ios3/download" + a + ".jpg") : $("#first_page").attr("src", "https://cdn.57piao.com/res/images/v3_ios3/download1.jpg")
});

function genQRCode(a, b) {
    a = new QRCode($(a)[0], {
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });
    a.clear();
    a.makeCode(b)
}

function showFix() {
    $("#phone_context").hide();
    $("#fix").show()
}

function hideFix() {
    $("#fix").hide();
    $("#phone_context").show()
};