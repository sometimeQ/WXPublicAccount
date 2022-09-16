const router = require('koa-router')();

// 这是渲染 views文件夹下面的网页的
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello some0ne!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 some0ne string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 some0ne json'
  }
})

router.get('/test', async (ctx, next) => {
  return ctx.body = {
    message: '请求成功啦, 棒',
    code: 200,
  }

  next();
})

module.exports = router

// router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// module.exports = router
