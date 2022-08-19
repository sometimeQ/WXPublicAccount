const fs = require('fs');

// fs.readdirSync 获取指定目录下的所有文件名称，遍历引入路由模块并注册 
const useRoutes = function() {
  // 读取当前文件下的路由 __dirname
  fs.readdirSync('./routes').forEach((file) => {
    console.log(file);
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    // this 代表的是app.js里面的,只不过提到这里来了
    this.use(router.routes(), router.allowedMethods());
  });
}

module.exports = useRoutes;

