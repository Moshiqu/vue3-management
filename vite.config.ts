import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const evn = loadEnv(mode, process.cwd())

    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            viteMockServe({
                mockPath: 'mock', // mock文件所在文件夹
                localEnabled: command === 'serve', // 保证开发阶段使用mock接口
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve("./src")
            }
        },
        server: {
            proxy: {
                [evn.VITE_APP_BASE_API]: {
                    target: evn.VITE_SERVE,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";'
                }
            }
        }
    }
})
