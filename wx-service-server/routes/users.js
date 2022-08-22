const router = require('koa-router')()

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

module.exports = router

// router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// module.exports = router
