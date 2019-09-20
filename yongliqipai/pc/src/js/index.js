Getbaner().then(function(res) {
  var pc_html =
      '<div class="swiper-slide"><img src="./images/banner.png" alt="" srcset="" /></div>',
    mb_html =
      '<div class="swiper-slide"><img src="./images/banner@0.5x.png" alt="" srcset="" /></div>'
  var data = res.data
  if (data && data.length > 0) {
    if (data.length === 1) {
      $('.swiper-button-next-1', '.swiper-button-prev-1').hide()
    }
    $('.banner-pc .swiper-wrapper').empty()
    $('.banner-mobile .swiper-wrapper').empty()
    pc_html = ''
    mb_html = ''
    for (var i = 0; i < data.length; i++) {
      pc_html +=
        '<div class="swiper-slide"><img src=' +
        data[i].picturePc +
        ' alt=""></div>'
      mb_html +=
        '<div class="swiper-slide"><img src=' +
        data[i].pictureMb +
        ' alt=""></div>'
    }
    // data.forEach(function(ele) {
    //   pc_html +=
    //     '<div class="swiper-slide"><img src=' + ele.picturePc + ' alt=""></div>'
    //   mb_html +=
    //     '<div class="swiper-slide"><img src=' + ele.pictureMb + ' alt=""></div>'
    // })
  }
  $('.banner-pc')
    .find('.swiper-wrapper')
    .html(pc_html)
  $('.banner-mobile')
    .find('.swiper-wrapper')
    .html(mb_html)
  if (data.length > 1) {
    new Swiper('.banner', {
      // effect: 'cube',
      autoplay: {
        stopOnLastSlide: true
      },
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next-1',
        prevEl: '.swiper-button-prev-1'
      }
    })
  }
})

 
// 客服链接
$public.serviceUrl('#toServer, #toServe').then(function(d,c){
   $public.apiqr('#code-img,#codeImg',c)
}) 

// 二维码


// 游戏特色轮播
var swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {
    stopOnLastSlide: true
  },
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

// 右边浮动动画效果
$('#server').Float({ floatRight: 1, topSide: 200, side: 0 })

// h5进入游戏
var http = htp.protocol
// $public.apenurl(http, '#TIMED')

// 回到顶部
$('.top').on('click', function() {
  $('html,body').animate({ scrollTop: 0 }, 300)
})
