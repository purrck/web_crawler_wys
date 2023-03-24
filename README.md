# web_crawler_wys

#### 介绍

爬虫
大多数资源网站,小说,图片,bt,漫画等等都是2-3级的网页结构
通过配置根目录下的config/ SPIDER_TYPE{
  site: 站点,
  target: 一级目录 ,
  target_inner: 二级目录 ,
  dir: 下载文件夹,
}
可以覆盖很多场景下的爬虫需求
2.少数网站采用服务端渲染 可以用puppeteer
#### 软件架构

软件架构说明

#### 安装教程

1.  pnpm install

#### 使用说明

1.  配置根目录下的config文件 ---SPIDER_TYPE{
  site: 站点,
  target: 一级目录 ,
  target_inner: 二级目录 ,
  dir: 下载文件夹,
}
2.  修改 direct 里的 init 方法改变扒取的目标 分页等
3.  npm run main/ app


```
yellow
├─ README.md
├─ __TEST__  // 测试用例目录
│  ├─ buff.spec.js 
│  ├─ file.spec.js
│  └─ login.spec.js
├─ action    // 处理页面dom处理逻辑
│  ├─ bt_index.js
│  ├─ index.js
├─ babel.config.json // babel配置
├─ config.js     // 配置下载站点 dom层级 目标层级 存放文件夹
├─ direct        // node 执行脚本
│  ├─ bt_web.js
│  ├─ main.ts
│  ├─ mm_app.js
├─ example.png
├─ lib  // 一些特殊的封装 queue 对下载文件再次出来,logger,原生函数改写等
│  ├─ Queue.js
│  ├─ file.js
│  ├─ logger.js
│  └─ proto.js
├─ package.json   // 项目包管理
├─ pnpm-lock.yaml
├─ request        // 关于请求的封装
│  ├─ axios.js
│  ├─ request.js
│  ├─ superagent.js
│  └─ taskLimit.js
├─ tsconfig.json
└─ utils          // 自己写的方法封装
   ├─ download.js
   ├─ encrypt.js
   └─ index.js
   └─ login.js

```