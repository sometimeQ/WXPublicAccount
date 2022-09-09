import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import path from 'path';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';



// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
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
  })
}