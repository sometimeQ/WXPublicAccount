const Koa = require('koa')
const app = new Koa()

var sd = require('silly-datetime');

// 静态资源 页面
const views = require('koa-views')
const json = require('koa-json');

// 错误信息
const onerror = require('koa-onerror');
// 解析body中中的json请求数据
const bodyparser = require('koa-bodyparser');
// 日志
const logger = require('koa-logger');
// router 路由
const useRoutes = require('./routes');
const cors = require('koa2-cors');

// 端口号
const port = 3000; 

// error handler
onerror(app);

// 跨域
app.use(cors());

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  // 自定义错误句柄响应如下:
  onerror: function(error, ctx) {
    ctx.throw('body parse error', 422);
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 日志中间件
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss') + '  ' + `${ctx.request.ip}` + `${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 路由
app.useRoutes = useRoutes;
app.useRoutes(); 

// error-handling 回调错误日志
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// 监听端口号
app.listen(port, () => {
  // 前端服务器IP和端口号
  console.log(`server in running at http://localhost:${port}`);
  // console.log(`server in running at https://leew.top:${port}`);
})

module.exports = app
