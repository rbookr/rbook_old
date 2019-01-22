# bookServer

为我写的书提供后台服务.基于:

 - koa2
 - redis
 - markdown-it

## 特点

  - 前面后端分离
  - 使用webhook自动更新
  - 文章全部缓存到redis
  - 使用密码来控制访问

## 安装

```bash
git clone https://gitee.com/NOIP/bookServer
cd bookServer
cnpm i 
# 配置 config.js
cp config.default.js config.js
# change config.js


npm run start #启动服务
```

## 使用

文件的信息头

```
---
password:         # 文章的单独密码
#secret_level:   # 文章的等级
---
```

使用**单独密码**只能进行对应的文章,如果不输入单独的密码,使用通过`loginServer`登录

**末实现!!**

使用帐号**登录**,能进入对应的`secret_level<= user.level`的文章中,级别`0-10`

