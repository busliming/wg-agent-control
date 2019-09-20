window.onload = function(){
    getRem(640,100)

};
window.onresize = function(){
    getRem(640,100)

};
function getRem(pwidth,prem){
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + "px";
}
// $(function (){
//    var dochei=document.body.clientHeight;
//    var navheight=$(".navtab").height()
//    var headerheight=$('.bar-header').height()
//    var footerheight=$('.tab-nav').height()
//    var searchheight=$('.index_search').height()
//    var pagehei=navheight+headerheight+footerheight+searchheight
//    $('.slider-slides,.scroll-view').height(dochei-pagehei-20).css({'overflow-y': 'hidden'});
// })
