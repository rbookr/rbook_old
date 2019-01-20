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
secret:         # 文章的单独密码
secret_level:   # 文章的等级
---
```

使用**单独密码**只能进行对应的文章

使用帐号**登录**,能进入对应的`secret_level<= user.level`的文章中,级别`0-10`

## 设计思路

三/四级菜单

使用yaml的来配置菜单
lzay加载


### nav
分为两种nav

 - nav 主导航,只有一个,在书籍的根目录
 - subnav 副导航,有多个,在每个分类对应的文件夹下

   nav.yaml
```
算法<icon_name> : LINK
算法2<icon_name> : LINK
```

算法 代表显示的名字,icon_name 表示使用的icon,LINK表示副nav目录地址,也代表形成的`subnav {}`的object的key值

subnav.yaml

```
算法分类名<icon_name>:
    具体名<icon_name>: md5
```

md5 对应具体md文件的路径的md5,可以通过md5_map_path 找到真正的地址路径

### 主页

主页是一个特殊的subnav:indexnav.yaml

```
key: url
#<页面上显示的值>: 为了得到内容,要请求的url
```

## webbook的配置

todo


## 写的书

1.文件目录安排

```
 - <bookName>/
    - nav.yaml
    - indexnav.yaml
    - readme.md
    - <子目录>/
        - nav.yaml
        - 文章1.md
        - 文章2.md
```

2.文章内容安排

todo

3.???
todo


## todolist

- [ ] 加入webhook自动部署功能
- [ ] 完善readme.md
