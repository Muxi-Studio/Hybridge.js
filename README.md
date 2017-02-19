# YAJB-JavaScript
JavaScript lib for Yet Anther JavaScript Bridge

compatible with Android Chromium WebView(since API 30) and iOS WKWebView(iOS 8.0+).

[YAJB-Android]()
[YAJB-iOS]()

## Usage

```
var YAJB = require('yajb-js')
var yajb = new YAJB() // can also be accessed using window.YAJB 

yajb.send({event:"onBtnClick", data:{id:1}})
```

## APIs

`YAJB.prototype.send`

`YAJB.prototype.on`

`YAJB.prototype.trigger`