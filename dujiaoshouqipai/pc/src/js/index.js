
GetIP().then( function(data){
      $public.geturl(JSON.parse(data).client)
      // $public.apenurl(htp.protocol, '#TIMED')
     //获取跳转到游戏大厅连接  当前协议   跳转的id或者class  不传默认id #downloaddt
      $public.serviceUrl('#toServer,.serverUrl').then(  function(c){
          $public.apiqr('#code-img,#codeImg',c);
           setTimeoutsx()
     })   //获取客服连接地址自动绑定到id=href上  参数当前id或者class  不传默认id #serviceUrl
    // Getbaner().then(function(res) {
    //       var pc_html =
    //           '<div class="swiper-slide"><img src="./images/banner.png" alt="" srcset="" /></div>',
    //         mb_html =
    //           '<div class="swiper-slide"><img src="./images/banner@0.5x.png" alt="" srcset="" /></div>'
    //       var data = res.data
    //       if (data && data.length > 0) {
    //         if (data.length === 1) {
    //           $('.swiper-button-next-1', '.swiper-button-prev-1').hide()
    //         }
    //         $('.banner-pc .swiper-wrapper').empty()
    //         $('.banner-mobile .swiper-wrapper').empty()
    //         pc_html = ''
    //         mb_html = ''
    //         data.forEach(function(ele) {
    //           pc_html +=
    //             '<div class="swiper-slide"><img src=' + ele.picturePc + ' alt=""></div>'
    //           mb_html +=
    //             '<div class="swiper-slide"><img src=' + ele.pictureMb + ' alt=""></div>'
    //         })
    //       }
    //       $('.banner-pc')
    //         .find('.swiper-wrapper')
    //         .html(pc_html)
    //       $('.banner-mobile')
    //         .find('.swiper-wrapper')
    //         .html(mb_html)
    //       if (data.length > 1) {
    //         new Swiper('.banner', {
    //           // effect: 'cube',
    //           autoplay: {
    //             stopOnLastSlide: true
    //           },
    //           loop: true,
    //           navigation: {
    //             nextEl: '.swiper-button-next-1',
    //             prevEl: '.swiper-button-prev-1'
    //           }
    //         })
    //       }
    //     })   
})




// 游戏特色轮播
// var swiper = new Swiper('.swiper-container', {
//   effect: 'coverflow',
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: 'auto',
//   autoplay: {
//     stopOnLastSlide: true
//   },
//   loop: true,
//   coverflowEffect: {
//     rotate: 50,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: true
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   }
// })

// 右边浮动动画效果
window.innerWidth > 750 ? $('#server').Float({ floatRight: 1, topSide: 200, side: 50 }) : $('#server').Float({ floatRight: 1, topSide: 200, side: 0 });
$('#closeFloat').click(function(){
    $('.service').hide("slow");
});


// 回到顶部
$('.top').on('click', function() {
  $('html,body').animate({ scrollTop: 0 }, 300)
})
$('#location_hef').html(htp.host);
function openMailbox(){
  window.open("mail.html?mai="+$public.consultMailbox);
}


var ua = navigator.userAgent;
    var isiOS = ua.indexOf('iPhone') > -1
    if(isiOS){
         document.getElementById("shouxin").style.display="block";
    }else{
         document.getElementById("shouxin").style.display="none";
    }