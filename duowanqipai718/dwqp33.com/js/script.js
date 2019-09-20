var browser = {
  versions: function () {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') == -1
    };
  }()
}

    
function downApp() {
	var ua = window.navigator.userAgent;
	var isBaidu = ua.indexOf('baiduboxapp') !== -1;
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		showXR()	
		if (isBaidu) {
            hideXR()
			showBaiduT()
		}else{
			document.getElementById("download_if").src = 'https://178f.cc/index2.html?shareName=6baidu'
	    	location.href = 'itms-services://?action=download-manifest&url=https://www.178ios.com/178/com.qipai178.game/a.plist'
		}
	}else{
	    document.getElementById("download_if").src = 'https://178f.cc/index2.html?shareName=6baidu'
	    location.href = 'itms-services://?action=download-manifest&url=https://www.178ios.com/178/com.qipai178.game/a.plist'
	}
}

function showXR(){
	$('.trustBox').fadeIn()
}
function hideXR(){
	$('.trustBox').hide()
}
function showBaiduT(){
	$('#open_safari').fadeIn()
}
function hideBaiduT(){
	$('#open_safari').hide()
}
$(function(){
  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
  	$('.trustBtn').show()
  } else {
  	$('.trustBtn').hide()
  }
  
})
