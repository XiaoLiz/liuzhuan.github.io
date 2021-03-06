---
layout: post
title: Express.js 常见问题
date: 2018-05-15
---

* TOC
{:toc}

## `http.createServer` 和 `app.listen` 的区别是什么？

```js
var express = require('express')
var app = express()
app.listen(3000)
```

和

```js
var express = require('express')
var http = require('http')
var app = express()

http.createServer(app).listen(80)
```

两者都可以实现服务器监听，他们之间的区别是什么？

为了回答这个问题，需要阅读 express 的[源文件][app.listen]：

```js
/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @public
 */

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

可以看出，`app.listen` 其实是 `http.createServer()` 的简单封装，如果只是使用 http 服务器，`app.listen()` 就够用了。

但是如果你要监听 https 端口（或同时监听 http 80 端口和 https 443 端口），就要使用 `https.createServer()` 手动创建服务器，并将 `express()` 生成的应用当作参数传递进去。

## REF

- [express 里 http.createServer 和 app.listen 有什么区别？][express.listen]

[express.listen]: https://cnodejs.org/topic/5396cd60c3ee0b5820f00e2a
[app.listen]: https://github.com/liuzhuan/express/blob/master/lib/application.js#L595-#L619