"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};OpenInstall=function(e,n,t){function r(n){for(var t=(n=n||e.location.href).indexOf("?"),r=(-1==t?"":n.substring(t+1).replace(/\+/g,"%20")).split("&"),i={},o=0;o<r.length;o++){var a=r[o].split("="),c=decodeURIComponent(a[0]||""),u=decodeURIComponent(a[1]||"");c&&u&&(void 0===i[c]?i[c]=u:"object"==_typeof(i[c])?i[c].push(u):i[c]=[i[c],u])}return i}function i(e){var n=[];for(var t in e){var r=e[t];if("[object Array]"==Object.prototype.toString.call(r))for(var i=0;i<r.length;i++)null!=r[i]&&void 0!==r[i]&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(r[i]));else null!=r&&void 0!==r&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}return n.join("&")}function o(){var e=0,n=arguments.length,t=arguments[e],o=t.indexOf("?"),a=r(t);for(e=1;e<n;e++){var c=arguments[e];for(var u in c)a[u]=c[u]}return(-1==o?t:t.substring(0,o))+"?"+i(a)}function a(){this.arr=[],this.run=function(e){this.arr?this.arr[this.arr.length]=e:e()},this.isReady=function(){return null==this.arr},this.ready=function(){if(null!=this.arr)for(var e=0;e<this.arr.length;e++)this.arr[e]();this.arr=null}}function c(e){var n=new t,r=e.data,i=e.url,o=e.method;r&&"string"!=typeof r&&(r=A.stringify(r)),"POST"!=o&&r&&(i=i+(i.indexOf("?")>-1?"&":"?")+r,r=null),n.onreadystatechange=function(){if(4==n.readyState){if(200==n.status){var t=n.response||n.responseText||{};e.success&&e.success("string"==typeof t?A.parse(t):t)}else e.error&&e.error(n,n.statusText);e.complete&&e.complete(n)}},n.ontimeout=function(){e.error&&e.error(n,n.statusText)};try{n.open(o,i,!1!==e.async),n.withCredentials=!0;try{n.setRequestHeader&&e.contentType&&n.setRequestHeader("Content-Type",e.contentType),e.timeout&&(n.timeout=e.timeout)}catch(e){}n.send(r||null)}catch(e){}return n}function u(){var e=n.createElement("canvas");if(e&&"function"==typeof e.getContext)for(var t=["webgl","webgl2","experimental-webgl2","experimental-webgl"],r=0;r<t.length;r++){var i=t[r],o=e.getContext(i);if(o){var a={};a.context=i,a.version=o.getParameter(o.VERSION),a.vendor=o.getParameter(o.VENDOR),a.sl_version=o.getParameter(o.SHADING_LANGUAGE_VERSION),a.max_texture_size=o.getParameter(o.MAX_TEXTURE_SIZE);var c=o.getExtension("WEBGL_debug_renderer_info");return c&&(a.vendor=o.getParameter(c.UNMASKED_VENDOR_WEBGL),a.renderer=o.getParameter(c.UNMASKED_RENDERER_WEBGL)),a}}return{}}function l(n){R(function(t){var r,i,o,a;try{r=e.screen.width||"",i=e.screen.height||"",o=e.devicePixelRatio||"",a=u()}catch(e){}for(var c=0,l=(t=t||[]).length;c<l;c++)t[c]=C(t[c]||"");n({sw:C(""+(r||0)),sh:C(""+(i||0)),sp:o,gv:C(a.version||""),gr:C(a.renderer||""),li:t})})}function s(t,r,i){var o="execCommand";if("function"!=typeof n[o])return!1;var a=n.createElement("div");a.innerHTML=t;for(var c=[],u=0;u<a.children.length;u++)c[u]=a.children[u];var l,s,f=!1,d=r?r+((new Date).getTime()+(i||1))+"-":null;for(u=0;u<c.length;u++){try{if(l=c[u],y&&(l.style.position="absolute",l.style.top="-100px"),n.body.appendChild(l),"SELECT"===l.nodeName)l.focus();else if("INPUT"===l.nodeName||"TEXTAREA"===l.nodeName){d&&(l.value=x(O(l.value)+d));var p=l.hasAttribute("readonly");p||l.setAttribute("readonly",""),l.select(),l.setSelectionRange(0,l.value.length),p||l.removeAttribute("readonly")}else{l.hasAttribute("contenteditable")&&l.focus(),d&&l.setAttribute("class",d),s=e.getSelection();var h=n.createRange();h.selectNode(l),s.removeAllRanges(),s.addRange(h)}f=n[o]("copy")}catch(e){f=!1}n.body.removeChild(l)}return s&&s.removeAllRanges(),f}function d(e,t){var r,i;void 0!==n.hidden?(r="hidden",i="visibilitychange"):void 0!==n.msHidden?(r="msHidden",i="msvisibilitychange"):void 0!==n.webkitHidden&&(r="webkitHidden",i="webkitvisibilitychange");var o=function(e){return n[r]},a=setTimeout(function(){null==a||o()||(e(),a=null)},t);i&&n.addEventListener(i,function e(t){null!=a&&o()&&(clearTimeout(a),a=null,n.removeEventListener(i,e))},!1)}function f(e,n,t,r){"function"==typeof t&&d(t,r),S[e](n)}var p=2,h=navigator.userAgent,v=h.indexOf("iPhone")>-1||h.indexOf("iPad")>-1||h.indexOf("iPod")>-1,y=h.indexOf("Android")>-1,g=function(){function t(){if(!o){o=!0;for(var n=0;n<i.length;n++)i[n].fn.call(e,i[n].ctx);i=[]}}function r(){"complete"===n.readyState&&t()}var i=[],o=!1,a=!1;return setTimeout(t,3e3),function(c,u){o?c(u):(i.push({fn:c,ctx:u}),"complete"===n.readyState||"loading"!==n.readyState&&!n.documentElement.doScroll?t():a||(n.addEventListener?(n.addEventListener("DOMContentLoaded",t,!1),e.addEventListener("load",t,!1)):(n.attachEvent("onreadystatechange",r),e.attachEvent("onload",t)),a=!0))}}(),m=function(){},b=function(){function e(e,n){var t,r,o,a,c=-1,u=e.length,l=[0,0,0,0];for(t=[];++c<u;)r=e[c],o=e[++c],l[0]=r>>2,l[1]=(3&r)<<4|(o||0)>>4,c>=u?l[2]=l[3]=64:(a=e[++c],l[2]=(15&o)<<2|(a||0)>>6,l[3]=c>=u?64:63&a),t.push(i.charAt(l[0]),i.charAt(l[1]),i.charAt(l[2]),i.charAt(l[3]));var s=t.join("");return n?s.replace(/=/g,""):s}function n(e){for(var n,t,r,o,a,c,u=[],l=0;l<e.length;)n=i.indexOf(e.charAt(l++))<<2|(o=i.indexOf(e.charAt(l++)))>>4,t=(15&o)<<4|(a=i.indexOf(e.charAt(l++)))>>2,r=(3&a)<<6|(c=i.indexOf(e.charAt(l++))),u.push(n),64!=a&&u.push(t),64!=c&&u.push(r);return u}function t(e){var n,t=-1,r=e.length,i=[];if(/^[\x00-\x7f]*$/.test(e))for(;++t<r;)i.push(e.charCodeAt(t));else for(;++t<r;)(n=e.charCodeAt(t))<128?i.push(n):n<2048?i.push(n>>6|192,63&n|128):i.push(n>>12|224,n>>6&63|128,63&n|128);return i}function r(e){var n,t,r,i=[],o=0;for(n=t=r=0;o<e.length;)(n=e[o])<128?(i.push(String.fromCharCode(n)),o++):n>191&&n<224?(t=e[o+1],i.push(String.fromCharCode((31&n)<<6|63&t)),o+=2):(t=e[o+1],r=e[o+2],i.push(String.fromCharCode((15&n)<<12|(63&t)<<6|63&r)),o+=3);return i.join("")}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";return[function(n){if(!n)return"";for(var r=t(n),i=r.length,o=0;o<i;o++)r[o]=150^r[o];return e(r,!0)},function(e){if(!e)return"";for(var t=n(e),i=0,o=t.length;i<o;i++)t[i]=150^t[i];return r(t)},function(n){return n?e(t(n)):""},function(e){return e?r(n(e)):""}]}(),C=b[0],E=b[1],x=b[2],O=b[3],R=function(){function n(){f.isReady()||(f.ready(),clearInterval(d),c&&c.close())}function t(e){n()}function r(e){for(var n=e.split("."),t=0,r=0;r<n.length;r++)t=t<<8|255&parseInt(n[r]);return t}function i(e){for(var t,i,o,a,c=e.split("\r\n"),u=0;u<c.length;u++){if(i=(t=c[u]).split(" "),0==t.indexOf("a=candidate:")&&(o=i[7])&&"host"==o&&(a=i[4]));else if(0==t.indexOf("a=rtcp:")&&(o=i[2])&&"IP4"==o&&(a=i[3]));else if(0!=t.indexOf("c=")||!(o=i[1])||"IP4"!=o||!(a=i[2]))continue;a&&!l[a]&&/[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(a)&&("0.0.0.0"==a||0==a.indexOf("127.")||0==a.indexOf("169.254")||3758096384==(4026531840&r(a))||(l[a]=1,s.push(a)))}s.length&&n()}var o,c,u,l={},s=[],f=new a,d=setInterval(function(){c&&c.localDescription&&c.localDescription.sdp&&u!=c.localDescription.sdp&&i(u=c.localDescription.sdp)},10);try{(o=e.RTCPeerConnection||e.mozRTCPeerConnection||e.webkitRTCPeerConnection)?((c=new o({iceServers:[]},{optional:[{RtpDataChannels:!0}]})).onicecandidate=function(e){e.candidate&&e.candidate.candidate&&i("a="+e.candidate.candidate)},c.createDataChannel("openinstall"),c.createOffer(function(e){try{c.setLocalDescription(e,function(){},t)}catch(e){t()}},t),setTimeout(n,100)):t()}catch(e){t()}return function(e){f.run(function(){e(s.slice(0))})}}(),A=e.JSON||{parse:function parse(e){return eval("("+e+")")},stringify:function(){var e=Object.prototype.toString,n=Array.isArray||function(n){return"[object Array]"===e.call(n)},t={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},r=function(e){return t[e]||"\\u"+(e.charCodeAt(0)+65536).toString(16).substr(1)},i=/[\\"\u0000-\u001F\u2028\u2029]/g;return function t(o){if(null==o)return"null";if("number"==typeof o)return isFinite(o)?o.toString():"null";if("boolean"==typeof o)return o.toString();if("object"==(void 0===o?"undefined":_typeof(o))){if("function"==typeof o.toJSON)return t(o.toJSON());if(n(o)){for(var a="[",c=0;c<o.length;c++)a+=(c?", ":"")+t(o[c]);return a+"]"}if("[object Object]"===e.call(o)){var u=[];for(var l in o)o.hasOwnProperty(l)&&u.push(t(l)+": "+t(o[l]));return"{"+u.sort().join(", ")+"}"}}return'"'+o.toString().replace(i,r)+'"'}}()},S={frm:function(e){var t=n.createElement("iframe");t.style.display="none",t.style.visibility="hidden",t.src=e,n.body.appendChild(t)},loc:function(n){e.location=n},hrf:function(e){var t=n.createElement("a");t.style.display="none",t.href=e,n.body.appendChild(t),t.click()},inhrf:function(e){var t=n.createElement("script");t.setAttribute("type","text/javascript"),t.innerHTML='(function(){var a = document.createElement("a");a.style.display = "none";a.href = "'+e.replace(/"/g,'\\"')+'";document.body.appendChild(a);a.click();})()',n.body.appendChild(t)},open:function(n){e.open(n)}},I=function e(t,r){function i(){if(v){h&&d(function(){n.body.appendChild(h)},400);var e=v;S[y](e)}else h&&n.body.appendChild(h)}function u(e,n,t){w.run(function(){var r;t=t||{},n&&I&&(e=!1),x&&n&&(m(),s(x,A,R)),n&&(r=i,T&&c({method:"POST",url:T})),b&&e?f(C,b,r,t.timeout||O):r&&r()})}function p(e){var r=t.mask||e;if("function"==typeof r&&(r=r()||e),"string"==typeof r){var i=n.createElement("div");i.innerHTML=r,r=i.children[0]}var o=function(){n.body.removeChild(r)};return r.addEventListener?r.addEventListener("click",o):r.onclick=o,r}if((t=t||{}).appKey){var h,v,y,b,C,O,x,A,R,I,T,w=new a,P=this;"function"==typeof t.onready&&w.run(function(){t.onready.call(P)}),t.buttonId&&w.run(function(){for(var e=t.buttonId.split(" "),r=0;r<e.length;r++){var i=n.getElementById(e[r]);i&&i.addEventListener("click",function(){P.wakeupOrInstall()})}}),this.wakeupOrInstall=function(e){u(!0,!0,e)},this.schemeWakeup=function(e){u(!0,!1,e)},this.install=function(e){u(!1,!0,e)},function(){var n={channelCode:t.channelCode||e.parseUrlParams().channelCode,c:t._channelRedirect?1:null,apkFileName:t.apkFileName,preferWakeup:t.preferWakeup,_pkgId:t._pkgId};l(function(i){c({url:o(e.server+"/web/init/"+t.appKey,n,i),method:"POST",contentType:"text/plain;charset=utf-8",data:r,success:function(e){g(function(){e.sh&&(h=p(e.sh)),v=e.fu,y=e.fm,e.ft,b=e.su,C=e.sm,O=e.st,x=e.ph?E(e.ph):null,A=e.pyp?E(e.pyp):null,R=e.pye?parseInt(E(e.pye)||"0"):0,I=e.dsoi,e.channelCode,T=e.csu,w.ready()})}})})}()}else alert("appKey not specified")};return I.channelRedirect=function(e,n){new I({appKey:e,channelCode:n,_channelRedirect:!0}).wakeupOrInstall()},I.parseUrlParams=r,I.docReady=g,I.server="//openinstall.io",I.wakeupOrInstall=function(e,n,t,r,i){n?f(e,n,function(){S[t](r)},i):S[t](r)},I}(window,document,XMLHttpRequest);