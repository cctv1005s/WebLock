# Web图案锁

## 介绍

基于html5的触摸图案锁。由于考虑到canvas在手机端的性能略差，并且使用canvas清晰度会有所降低，所以这里用div作为基本组件，重新封装了直线和圆的绘制方法。将直线和圆方法提供给Canvas组件，再在Canvas上封装了一层WebLock，最终使用WebLock作为构建的组件。

## 预览
![](http://upload-images.jianshu.io/upload_images/1806609-e046b457819ff4b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/1806609-78128ea6ec1461ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/1806609-1752113f6cb732fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/1806609-fb38507d566416f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Quick Start

- 初始化

      //使用WebLock类
      var wl = new WebLock(document.querySelector('body'));
      wl.start();

- 绘制结束后事件
      
      //只能有一个结束事件，下一个结束事件会覆盖上一个结束事件
      wl.done(function(password){ 
           console.log(password);//sample:[1,2,3,4,5];
      })

- 简单配置
      
      //三个配置选项，直线样式，圆普通状态时样式，圆经过时样式
       wl.config({
            line:{
                background:'black',
                height:'10px',
                'border-radius':"10px"
            },
            circle:{
                background:'white',
                border:'1px solid grey'
            },
            active:{
                background:'red',
                border:'1px solid grey'
            }
       });

## 目录结构
 - /dist webpack最终打包压缩后的文件
 - /src 各种组件文件
 - /test 测试文件

## 构建
    
    $   npm install 
    $   webpack -p

## 调试开发
    
    $ webpack-dev-server

打开http://localhost:8888 进行调试

## 测试

    $ mocha     

## Demo

请访问 https://cctv1005s.github.io/ 
仅支持手机端，浏览器端请开启手机调试模式



























