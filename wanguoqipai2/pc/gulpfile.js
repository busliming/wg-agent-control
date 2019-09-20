let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css'); //压缩css
let connect = require('gulp-connect'); //服务
let htmlmin = require('gulp-htmlmin'); //压缩html
let proxy = require('http-proxy-middleware');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
let less=require('gulp-less');
const babel = require('gulp-babel');
const prefix = require('gulp-prefix-url');
const config=require('web-app-amina-new');
const modifyCssUrls = require('gulp-modify-css-urls');
var parseArgs = require('minimist')
 let prefixFn = function(e) {
         if(e.pathname.includes('@CDN_url')){
              e.path  = `${gulp.env.cloudUrl}`+ e.path.slice(8,e.path.length) 
              return 
         }else{
           if(gulp.env.cdnurl==undefined  || gulp.env.cdnurl==''){
                   return  './';
            }else{
                   return  gulp.env.cdnurl
            }
         } 
  };
gulp.task('script', () => {
    // 1. 找到文件
        gulp.src([config.src+'js/*.js','!'+config.src+'js/*.min.js'])
    // 2. 压缩文件
        .pipe(babel({
            presets: ['es2015']
        }))
       .pipe(minify())
    // 3. 另存压缩后的文件
        .pipe(gulp.dest(config.dev+'js'))
})
gulp.task('copy', () =>{
    return gulp.src(config.src+'js/*.min.js')
        .pipe(gulp.dest(config.dev+'js'));
    }
);
gulp.task('testLess',function(){
    gulp.src([config.src+'css/detail.less'])//多个文件以数组形式传入
        .pipe(less())
        .pipe(gulp.dest(config.src+'css'))//将会在src/css下生成index.css以及detail.css
        .pipe(connect.reload());

});

 
gulp.task('minify-css', () => {
    gulp.src(config.src+'css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.dev+'css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
       // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      //  removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
gulp.src(config.src+'*.html')
    .pipe(prefix(prefixFn))
    .pipe(htmlmin(options))
    .pipe(gulp.dest(config.dev))
    .pipe(connect.reload())
});

gulp.task('imagemin',  () =>{
          gulp.src(config.src+'images/*')
        .pipe(imagemin())
　　　　　　　　//压缩后放在那个文件夹
        .pipe(gulp.dest(config.dev+"images"));
        gulp.src(config.src+'images/h5/*')
        .pipe(gulp.dest(config.dev+"images/h5"))
        .pipe(connect.reload())

});


gulp.task('auto',()=>{
   gulp.watch(config.src+'js/*.js',['script']);
   gulp.watch(config.src+'css/*.less',['testLess']);
   gulp.watch(config.src+'css/*.css',['minify-css']);
   gulp.watch([config.src+'*.html'], ['html']);
   gulp.watch([config.src+'images/*.{jpg,png,gif}'], ['imagemin']);
})

gulp.task('dev',['auto','imagemin','html','minify-css','testLess','script','copy'],()=>{
    connect.server({
          root:config.dev,//从哪个目录开启server
          // port:8089,//将服务开启在哪个端口
          livereload: true,
          middleware: function (connect, opt) {
              return [
                proxy('/api', {
                  target: 'http://www.bsqp555.com/',  
                  changeOrigin:true,
                  // pathRewrite: {
                  //     '^/api':''
                  //  }
                }),
              ]
            }
     });
});



//prod 线上环境
gulp.task('script-prod', () => {
    // 1. 找到文件
        gulp.src([config.src+'js/*.js','!'+config.src+'js/*.min.js'])
    // 2. 压缩文件
        .pipe(babel({
            presets: ['es2015']
        }))
       .pipe(minify())
    // 3. 另存压缩后的文件
        .pipe(gulp.dest(config.dist+'js'))
})
gulp.task('copy-prod', () =>{
    return gulp.src(config.src+'js/*.min.js')
        .pipe(gulp.dest(config.dist+'js'));
    }
);

 
gulp.task('minify-css-prod', () => {
    gulp.src(config.src+'css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(modifyCssUrls({
          modify: function (url, filePath) {
             if(gulp.env.cdnurl==undefined  || gulp.env.cdnurl==''){
                 return  url
             }else{
                 return  gulp.env.cdnurl+url.slice(3)
             }
          },
        }))
    .pipe(gulp.dest(config.dist+'css'))
});



gulp.task('html-prod', function () {
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(config.src+'*.html')
    .pipe(prefix(prefixFn))
    .pipe(htmlmin(options))
    .pipe(gulp.dest(config.dist))
});

gulp.task('imagemin-prod',  () =>{
          gulp.src(config.src+'images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist+"images"));
        gulp.src(config.src+'images/h5/*')
        .pipe(gulp.dest(config.dist+"images/h5"))
});



gulp.task('build',config.gulp());

