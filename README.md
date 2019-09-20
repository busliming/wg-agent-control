# portal-front

## 快速上手

#### 0、https://nodejs.org/zh-cn/   下载安装nodeJS
```
略 😆
```

#### 1、验证安装成功:
```
node -v
* 在任意路径输入命令行命令，能显示版本号为正确安装
```

#### 2、git克隆项目到本地  
```
略 😆
```

#### 3、命令行进入项目文件夹
```
cd portal-front
*然后在cd 到站点项目文件夹
比如：cd yaojiqipai  或者 :cd huihuangq100
* 包含package.json文件的文件夹
```

#### 4、安装依赖
```
npm i   
* npm install的简写
* 随着功能的扩充，依赖包会逐渐增加，重复运行该命令会自动安装本项目没有安装过的依赖
```

#### 5、本地开发：
```
npm run dev

* 启动后所有接口请求默认代理转发到gulpfile.js文件里的target里。比如：target:'http://www.huihuang100.com'
* 启动后依据终端提示 App running at: 的路径即可本地访问该web应用
* 默认端口8089
```
