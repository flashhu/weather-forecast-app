# 天气预报 App

> React + cordova 混合App

[H5 手机App 开发入门：概念篇 - 阮一峰的网络日志](https://www.dogedoge.com/rd/R61SLnniIrr%2F7WmBOg7H53UhdqIFYMS4XwWCV%2BXttlfxE9UHKNtl3OZQHq%2F7fbBgVOUvxO3J%2BCr18%2BpPwTiVBA%3D%3D)

[H5 手机App 开发入门：技术篇 - 阮一峰的网络日志](https://www.dogedoge.com/rd/9IdfKxFGiL1WX4cDLPOjl%2Fn%2FEm%2FpLEdXvTMMBrXHeC21e6qMscCcD8lspC%2FMTsWHfwqYd19nnA%2B2ECRLju7w3vdD1kk9wg4cOzX2USjAcCQ%3D)

## 搭建过程
参考文章：

1. [cordova从0到1](https://segmentfault.com/a/1190000020880025)
2. [加上React](https://medium.com/@pshubham/using-react-with-cordova-f235de698cc3)

## 如何运行

> 如未配置好安卓环境，建议见上述参考文章一

1. 添加平台支持

   ```
   cordova platform add android
   cordova platform add browser
   ```

2. 安装依赖的包

   ```
   npm install
   ```

3. 运行 web 端

   ```
   cordova run browser
   或 
   npm start
   ```

4. 运行移动端

   ```
   cordova run android
   ```

## 踩坑记录

### 1. Refused to load the script because it violates the following Content Security Policy directive

[参考](https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po?rq=1)

**问题原因：** 请求内容和`public/index.html`中的设置不相符，违反内容安全策略

**解决途径：**

原定义如下
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
```
错误信息如下
```
Refused to connect to 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-
CN&key=eb33dbe3cb9942619130dd85e05056d6' because it violates the following Content Security Policy directive: 
"default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval' 'unsafe-inline'". Note that 'connect-src' was not explicitly 
set, so 'default-src' is used as a fallback.
```
修改后的生效形式和不同的需求强相关
笔者的需求为可接受不同源的 http，https, 以及接收图片base64 

```
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'self'; style-src 'self' 'unsafe-inline'; media-src *">
```

在后续的实践中，又遇到了这类问题，体悟不深，故直接去了这部分的限制 orz

### 2. http 请求浏览器正常，安卓请求失败

> 安卓高版本对非明文传输有要求

[参考](https://www.jianshu.com/p/12ab6718e81c)

笔者添加如下代码后
```
<edit-config file="AndroidManifest.xml" mode="merge" 
target="/manifest/application">
            <activity android:usesCleartextTraffic="true" />
        </edit-config>
```
在构建安卓应用时出现报错
```
> Task :app:mergeDebugResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeDebugResources'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
   > Android resource compilation failed
```
但在 `platforms/android/android.json`中多出这一段
```
      "AndroidManifest.xml": {
        "parents": {
          "/manifest/application": [
            {
              "xml": "<activity android:usesCleartextTraffic=\"true\" />",
              "count": 1,
              "mode": "merge",
              "id": "config.xml",
              "oldAttrib": {
                "android:hardwareAccelerated": "true",
                "android:icon": "@mipmap/ic_launcher",
                "android:label": "@string/app_name",
                "android:supportsRtl": "true",
                "android:usesCleartextTraffic": "true"
              }
            }
          ]
        }
```
重新构建后，即可正常请求

### 3. 跨域

移动端上没有跨域，故需要把在浏览器上运行时有关解决跨域的代码注释掉

