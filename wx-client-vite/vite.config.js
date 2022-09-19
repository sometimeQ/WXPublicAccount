import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import path from 'path';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';



// https://vitejs.dev/config/
export default ({ mode }) => {

  console.log(loadEnv(mode, process.cwd()).VITE_APP_BASE_API);
  console.log('哈哈哈哈哈');


  return defineConfig({
    // root: process.cwd,c
    base: './',
    plugins: [
      vue(),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        // 自定义图标加载
        customCollections: {
          home: FileSystemIconLoader('src/assets/svg/home', svg => svg.replace(/^<svg /, '<svg fill="currentColor"')),
        }
      })
    ],
    resolve: {
      // 别名
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),

        // 设置别名, 尽量全用别名@/查找路径
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "./src/assets/styles/index.scss";',
        }
      },
    },
    /*
    server: {
      // 启动端口
      port: 3000,
      open: true,
      proxy: {
        // 选项写法
        '/api': loadEnv(mode, process.cwd()).VITE_APP_BASE_API   // 代理网址
      },
      cors: true
    }
    */

    // 配置前端服务地址和端口
    server: {
      port: 8081, // 前端端口
      open: true,
      host: '0.0.0.0', 
      //'localhost',
      https: false,
      cors: true,
      // vue.config.js中配置的代理，打包到服务器之后这里的配置是无效的，实际代理到nginx去了，因此这里的代理只对本地运行有效
      proxy: {
        // 选项写法
        '/testApi': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API, // 后端url
          changeOrigin: true, // 域名需要
          ws: true,
          secure: true, // 不检查安全问题,可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器
          pathRewrite:{'^/testApi': '/'}, 
        }
      }
    }
  })
}