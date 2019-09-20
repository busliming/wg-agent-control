const SRC_DIR='./src/';   //源路径
const DEV_DIR='./dev/';   //生成开发环境的文件
const DIST_DIR='./dist/';  //生成生产环境的文件

const config={
    src:SRC_DIR,
    dist:DIST_DIR,
    dev:DEV_DIR,
};

module.exports=config;  //把这个接口暴露给别的文件用
