var browser = {
  versions: function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
      };
    }
    (),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}




if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
  $('.jiao').show();
} else if (browser.versions.android) {
  $('.jiao').hide();
  $('.jie').css('padding-bottom', '160px');
}

if (document.documentElement.clientWidth > 750) {
  $('.jiao').hide();
  $('.jie').css('padding-bottom', '160px');
}
var isIos = (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));

if (isIos) {
  setTimeout(function () {
    var sureDown = confirm('是否立即安装APP，领取豪礼？');
    if (sureDown) DownSoft();
  }, 3000);

}
var showTeach = function () {
  if (isIos) $('.ios_teach').show();
};
var hideTeach = function () {
  $('.ios_teach').hide();
};

var getTime = function () {
  var sonItem = $('.son_number');
  $.each(sonItem, function () {
    let tempTime = (5 + Math.ceil(Math.random() * 50)) + 'ms';
    $(this).html(tempTime);
  });
};
getTime();
var DownSoft = function () {
  showTeach();
}