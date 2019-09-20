let htp = window.location
class Mx{
	constructor(){
		this.mapping = [2, 0, 3, 1];
		this.remapping = [ 1, 3, 0, 2];
		this.mov = this.mapping.length;
	}
     changeInt(a, encrypt) {
        // 排除0
        if (encrypt && a == 22369621) {
            return 44739242;
        } else if (!encrypt && a == 44739242) {
            return 22369621;
        }
        let b = 0;
        for (let i = 0, j = 26 - this.mov / 2; i < 26 / (this.mov / 2); ++i, j -= this.mov / 2) {
            b |= (encrypt ? this.mapping[Math.abs(a % this.mov)] : this.remapping[Math.abs(a % this.mov)]) << j;
            a >>>= this.mov / 2;
        }
        
        return b;
    }

     cryptPwd(password,salt) {
        // 密码“加盐”
        var auth = password + ':' + salt;
        // console.log('原始密码：%s', password);
        // console.log('加盐后的密码：%s', auth);
        // 加盐密码的md5值
        var hash  = md5.create('md5');
        var result = hash.update(auth).hex()
        return result;
    }
}
var $public={
	       Android:'',  //安卓api
	       openAndroid:'',//安卓跳转地址
	       iosapi:'', // ios请求地址
	       openios:'', //ios跳转地址
	       IPURL:'', //ip地址,
	       consultMailbox:'',
	       timestamp:'', //时间错
	       auth:'',
	       appKey:'',
	       cryptPwdfu:function(){
              let M5 = new Mx()
              let changeInt = M5.changeInt(this.timestamp,true)
              let auth = M5.cryptPwd(changeInt,'HWhsZq6zK6KDqgMV')
              this.auth =  auth
	       },
		   GetQueryString:function (name){    //正则检测查询参数
			    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			    let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
			    if (r != null) return unescape(r[2]); return null;
		   },
		   serviceUrl: function(id='#serviceUrl'){
		  	    let self = this 
			  	return {
                    then: function(cb) {
                        $.ajax({  ///获取客服连接
                            url:'/api/homePage/getSiteGlobConfig',
                            type: 'post',
                            headers: {
                            	realIp:self.IPURL,
			                    auth:self.auth,
			                    timestamp:self.timestamp
			                },
                            success:function(data){
                            	let url
                                $(id).attr('href',data.data.serviceUrl)
                                self.consultMailbox=data.data.consultMailbox
                                self.appKey=data.data.appKey
                                if(data.data.popuUrl=='' || data.data.popuUrl==null){
                                	  if (!htp.search){
										     url = htp.protocol+'//'+htp.host
										  }else{
										     url = htp.protocol+'//'+htp.host + '/' + htp.search
									   }
                                }else{
                                       url  = htp.protocol+'//'+data.data.popuUrl+htp.search
                                }
                                cb&&cb(url)
                            }
                        })
                    }
                }
		   },
		   apiqr:function(qrco,vars){   //生成二维码图片  qrco=id名  vars=跳转连接地址
			  let accou = this.GetQueryString('a') || '-1';
			  let codeUrlA = vars.replace('-1',accou)
			  let remHttps = codeUrlA.replace('https','http')
			  $(qrco).qrcode(
					    {
					        render: "canvas",                  //table方式
					        width: 100,                       //宽度
					        height:100,                       //高度
					        background: "#ffffff",            //背景颜色
					        foreground: "#000",                //前景颜色
					        text: remHttps  //任意内容
					    });
		   },
		   geturl:function(isip){  //获取下载连接地址
	        	let accou = this.GetQueryString('a') || '-1';
	        	let self = this
	            $.ajax({
	                url:'api/homePage/getSiteDlInfo?' +new Date().getTime(),
	                type: 'post',
	                headers: {
	                    realIp:isip,
	                    auth:self.auth,
	                    timestamp:self.timestamp
	                },
	                contentType: 'application/json;charset=UTF-8',
	                dataType: 'json',
	                data: JSON.stringify({"account": '',"token": ''}),
	                success: function (data) {
	                    for (var i = 0; i < data.data.length; i++) {
	                        let s = data.data[i].fileUrl.replace('-1',accou);
	                        let l = s.replace('ppdl/ip','ppdl/'+isip)
	                        if (data.data[i].apkType == 'Android') {
	                            self.Android = l  //安卓上报地址
	                            self.openAndroid = data.data[i].apkName
	                        } else if(data.data[i].apkType == 'IOS'){
	                            self.iosapi = l   //ios上报地址
	                            self.openios = data.data[i].apkName
	                        }
	                    }
	                }
	            });
           },
           apenurl:function(http,id='#downloaddt'){ //跳转到游戏大厅
           	     let self = this;
           	     let accou //推广参数
           	     if(this.GetQueryString('pId')==null || this.GetQueryString('pId')==''){
           	     	let a = this.GetQueryString('a') || '-1'
	           	     	if(a=='-1'){
	           	       		accou = ''
	           	     	}else{
	           	     		accou = '&a=' +  a
	           	     	}
           	     }else{
                     accou = '&pId=' + this.GetQueryString('pId') 
           	     }
		         $.ajax({
		            url:'api/account/getSiteGameDomainInfo',
		            type: 'post',
		            headers: {  
		            	        realIp:self.IPURL,
			                    auth:self.auth,
			                    timestamp:self.timestamp
			                },
		            contentType: 'application/json;charset=UTF-8',
		            dataType: 'json',
		            data: JSON.stringify({"account": '',"token": ''}),
		            success: function (data) {
		                $(id).attr('href',http+ '//'+data.data.domainUrl+'?siteName='+data.data.siteName+accou)
		            }
		        });
		   },
		   ISMobile:function(){
              	let u = navigator.userAgent;
      			let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      			//var ua = navigator.userAgent.toLowerCase();
      			if(isAndroid){
                  this.h5android()
                }else if(isiOS){
                  this.h5ios() 
      			}
           },
           pcios:function(id='pcios_new'){ //pcios跳转地址 
            	 let self = this
            	 let u = navigator.userAgent.toLowerCase(); 
		         let ele = document.getElementById(id)
         		 if (ele) {
		            ele.click()
		            return
		         }		
                 $.ajax({ //获取下载请求
		                 url:this.iosapi.replace('http://','//'), //.replace('/api', ''),
		                type: 'get',
		                success: function(data) {
				          let a = document.createElement('a')
				          if(u.match(/iPad/i)=="ipad"){
				          	 let newUrl = 'itms-services://?action=download-manifest&url=' + data.replace('.html', '.plist')
				          	 a.setAttribute('href', newUrl.replace('http://','//'));
				          }else{
				             a.setAttribute('href',self.openios.replace('http://','//'));
				          }
				          a.setAttribute('id',id)
				          a.setAttribute('target', '_self')
				          document.getElementsByTagName('body')[0].appendChild(a)
				          a.click()
				        }  
		          })   
		   },
		   h5android:function(id='android_new'){  //移动端下载安卓包
		        let ele = document.getElementById(id)
		        if (ele) {
		            ele.click()
		            return
		        }
		        $.ajax({ //获取下载请求
		                url:this.Android.replace('http://','//'), //.replace('/api', ':9013'),
			                type: 'GET',
		                success: function(data) {
		                  let a = document.createElement('a')
		                  a.setAttribute('href',data.replace('http://','//'));
		                  a.setAttribute('id', id)
		                  a.setAttribute('target', '_self')
		                  document.getElementsByTagName('body')[0].appendChild(a)
		                  a.click()
		                }
		        })
           },
           h5ios:function(id='ios_new'){  //移动端ios下载
        		let ele = document.getElementById(id)
		        if (ele) {
		            ele.click()
		            return
		        }
		        $.ajax({ //获取下载请求
		                url:this.iosapi.replace('http://','//'),  //.replace('/api', ''),
		                type: 'get',
		                success: function(data) {
		                  let newUrl = 'itms-services://?action=download-manifest&url=' + data.replace('.html', '.plist')
		                  let a = document.createElement('a')
		                  a.setAttribute('href', newUrl.replace('http://','//'));
		                  a.setAttribute('id',id)
		                  a.setAttribute('target', '_self')
		                  document.getElementsByTagName('body')[0].appendChild(a)
		                  a.click()
		                }
		        })
   		   }
}
 function GetIP(){
       return {
           then: function(cb) {
             $.ajax({ //获取IP地址
                url:'clientip/',
                type: 'get',
                timeout : 1000, 
                success:(data)=>{
		               databox(data)
		        },
                error:function(error){
                	cowmalls()
                }
              }) 
              function cowmalls(){
                  $.ajax({ //获取IP地址
		                url:'//clientip.5335cq.com/',
		                type: 'get',
		                timeout : 1000, 
		                success:(data)=>{
		                	 databox(data)
		                },
		                error:function(error){
		                	 clientip()
		                }
                  })  
              }
              function clientip(){
                  $.ajax({ //获取IP地址
		                url:'//clientip.wgqp.net/index.php',
		                type: 'get',
		                timeout : 1000, 
		                success:(data)=>{
		                	 databox(data)
		                },
		                error:function(error){
		                	 clien14()
		                }
                  })  
              }
              function clien14(){
                  $.ajax({ //获取IP地址
		                url:'//clientip.cowmalls.com',
		                type: 'get',
		                timeout : 1000, 
		                success:(data)=>{
		                	 databox(data)
		                },
                  })  
              }
             function databox(data){
             	   if (typeof data == 'string') {
		                 $public.IPURL=JSON.parse(data).client
                         $public.timestamp=JSON.parse(data).timestamp  
                          $public.cryptPwdfu()
                          cb&&cb(data)
		            }else{
		                 $public.IPURL=data.client
                         $public.timestamp=data.timestamp  
                         $public.cryptPwdfu()
                         cb&&cb(JSON.stringify(data))
		            }
                   
             }
           }
       }

}
             
function Getbaner(){//获取banner图
        return {
          then: function(cb) {  
                   $.ajax({  ///获取banner图
                    url:'/api/picture/getPictureList',
                    type: 'post',
                    headers: {  
                    	        realIp:$public.IPURL,
			                    auth:$public.auth,
			                    timestamp:$public.timestamp
			                },
                    contentType: 'application/json;charset=UTF-8',
                    dataType: 'json',
                    data:JSON.stringify({ "pictureType":'1'}),
                    success:function(data){
                           cb&&cb(data)
                        }
                    }) 
             }   
        } 
}



function clipboardjss(url, callback) {
	 var openstyle = `#open_safari {
            position: fixed;
            background: rgba(0, 0, 0, .7);
            color: #fff;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 99999;
        }

        #open_safari img {
            width: 100%;
        }

        #open_safari .w640 {
            padding: 60px;
        }

        .ios_show,
        .and_show {
            display: none;
        }

        .w640 {
            position: relative;
            max-width: 640px;
            margin: 0 auto;
        }

        #open_safari a#copyBtn {
            max-width: 30vw;
            display: block;
            margin: 10px auto;
        }

        #open_safari .safari_info {
            max-width: 70vw;
            margin: 20px auto;
        }

        .hide {
            position: absolute;
            left: -100vw;
            top: -100vh;
        }`
	 callback = typeof callback === 'function' ? callback : function() {};
	 var head = document.getElementsByTagName('head')[0];
	 var script = document.createElement('script');
	 var style = document.createElement('style');
	 script.type = 'text/javascript';
	 script.src = url; 
	 script.onreadystatechange = function() {
	 if(this.readyState == "loaded" || this.readyState == "complete"){
	  callback();
	 }
	 }
	 style.innerHTML= openstyle;
	 script.onload = callback;
	 head.appendChild(script);
	 head.appendChild(style);
}
clipboardjss('//img.csdncw.com/online/20190430/clipboard.min.js')

var  openHtml = ` <div id="open_safari" style="display: none;">
			        <div class="w640 ios_show" style="display: block;">
			            <p>
			                1.百度APP客户端内无法下载，请复制以下网址到苹果浏览器safari打开
			            </p>
			            <p>
			                <a id="copyBtn"><img src="//img.csdncw.com/online/20190430/copy_btn.png" alt=""></a>
			            </p>
			            <p>2.打开苹果safari浏览器，粘贴并前往后即可下载</p>
			            <p class="safari_info"><img src="//img.csdncw.com/online/20190430/safari.png" alt=""></p>
			            <p>
			                <a style="max-width: 30vw;display: block;margin: 10px auto" id="closeBtn">
			                    <img src="//img.csdncw.com/online/20190430/close_btn.png"
			                    alt="">
			                </a>
			            </p>
			        </div>
			    </div>`
    
$(function(){
	$('#location_hef').html(htp.host)
	 console.log('2019-08-12-14:27')
	 var dom=document.createElement('div');
		dom.className='book';
		dom.innerHTML= openHtml;
		document.body.appendChild(dom);
});


var uabd = window.navigator.userAgent;
var isBaidu = uabd.indexOf('baiduboxapp') !== -1;
var isApple = uabd.match(/(iPhone|iPod|iPad);?/i)
var clipboard 
function opensafari(){
	    if (!clipboard) {
            clipboard = new ClipboardJS('#copyBtn', {
		        text: function () {
		            return window.location.href
		        }
	       });
	        clipboard.on('success', function (e) {
		        alert('复制成功')
		        e.clearSelection();
		    });
		    $('#closeBtn').on('click', function () {
		        $('#open_safari').fadeOut();
		    });	
	    }
}