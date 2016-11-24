# fis3-command-publish

> fis3-command-publish 是一个使用命令行将项目发布至线上的 npm 组件

## 安装

### 通过 git 安装
```sh
cd /usr/local/lib/node_modules
git clone https://github.com/andrew703/fis3-command-publish.git
cd fis3-command-publish
npm install
```

## 使用方法
#### 将项目发布至 lvyou.baidu.com 域名
```sh
fis3 publish --channel nuomi
```
#### 以 lmat-test 项目为例
#### 线上路径为 http://lvyou.baidu.com/static/event-lmat/lmat-test/index/

将项目发布至 map.baidu.com 域名
```sh
fis3 publish --channel map
```
#### 以 lmat-test 项目为例
#### 线上路径为 http://map.baidu.com/fwmap/upload/event-lmat/lmat-test/index/

修改项目的上一级路径名称
```sh
fis3 publish --path [PATHNAME] --channel map
```
#### 以 lmat-test 项目为例
#### 线上路径为 http://map.baidu.com/fwmap/upload/event-lmat/[PATHNAME]/lmat-test/index/

## 更新日志
#### 2016-11-24
* 完善README.md
