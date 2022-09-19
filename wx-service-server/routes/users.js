const router = require('koa-router')();

// 这是渲染 views文件夹下面的网页的
// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello some0ne!'
//   })
// })

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 some0ne string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 some0ne json'
  }
})

router.get('/testApi/test', async (ctx, next) => {
  return ctx.body = {
    message: '请求成功啦testApi , 棒',
    code: 200,
  }

  next();
});

router.get('/testApi/user', async (ctx, next) => {
  return ctx.body = {
    message: '请求到啦user接口成功',
    code: 200,
  }

  next();
});


router.get('/testApi/update', async (ctx, next) => {
  return ctx.body = {
    message: 'update信息接口返回值',
    data:[
    	{
	  "url": "www.baidu.com",
	  "name": "完美世界小说",
	  "des": "值得追"
	},
	{
          "url": "www.google.com",
	  "name": "深空彼岸",
	  "des": "孔宣为主教的一部玄幻小说"
	}
    ],
    code: 200,
  }

  next();
});


router.get('/test', async (ctx, next) => {
  return ctx.body = {
    message: 'test接口功棒',
    code: 200,
  }

  next();
});

router.get('/update', async (ctx, next) => {
  return ctx.body = {
    message: '这是不包含的tesApi前缀的接口请求成功的信息 ----update',
    data:[
        {
          "url": "www.baidu.com",
          "name": "完美世界小说",
          "des": "值得追"
        },
        {
          "url": "www.google.com",
          "name": "深空彼岸",
          "des": "孔宣为主教的一部玄幻小说"
        }
    ],
    code: 200,
  }

  next();
});

router.get('/user', async (ctx, next) => {
  return ctx.body = {
    message: '这是不包含的tesApi前缀的接口请求成功的信息 ------user',
    code: 200,
  }

  next();
});













module.exports = router

// router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// module.exports = router
