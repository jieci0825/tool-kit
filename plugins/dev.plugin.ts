/**
 * 一个开发插件
 * @description 监听 vite 开发服务器，并使用 electron 加载本地开发页面
 */

import esbuild from 'esbuild'
import type { ViteDevServer } from 'vite'
import { spawn } from 'child_process'
import path from 'node:path'
import fs from 'node:fs'

export const devPlugin = () => {
    return {
        name: 'dev-plugin',
        configureServer(server: ViteDevServer) {
            // 使用 esbuild 处理 electron 主线程文件
            esbuild.buildSync({
                entryPoints: ['src/main/main-entry.js'],
                bundle: true, // 启用打包，将依赖一起打包为一个文件
                platform: 'node', // 指定平台为node
                format: 'esm', // 指定输出格式
                outfile: 'dist/main.js', // 指定输出文件
                external: ['electron'] // 指定外部依赖，不打包
            })

            // 拷贝预加载脚本文件
            const srcPath = path.resolve(process.cwd(), 'src/main/preload.js') // 示例路径
            const distPath = path.resolve(process.cwd(), 'dist/preload.js')

            fs.copyFileSync(srcPath, distPath)

            // 监听 vite 开发服务器
            server.httpServer?.once('listening', () => {
                // 组装 electron 主线程加载的地址
                const addressInfo = server.httpServer?.address()
                if (!addressInfo || typeof addressInfo === 'string') return
                const url = `http://localhost:${addressInfo.port}`

                const electronProcess = spawn('electron', ['dist/main.js', url], {
                    cwd: process.cwd(),
                    stdio: 'inherit' // 继承主进程的输出
                })

                electronProcess?.on('exit', () => {
                    server.close()
                    process.exit()
                })
            })
        }
    }
}

// 处理 electron 在 preload 中暴露 api，但是因为 vite 屏蔽了这些模块，而导致在渲染进程中无法使用的问题
export const getReplacer = () => {
    // nodejs 一些常用的模块
    const externalModules = [
        'os',
        'path',
        'fs',
        'child_process',
        'crypto',
        'http',
        'events',
        'url',
        'buffer',
        'stream',
        'better-sqlite3',
        'knex'
    ]

    const result: any = {}

    externalModules.reduce((prev, cur) => {
        prev[cur] = () => {
            return {
                find: new RegExp(`^${cur}$`),
                code: `const ${cur} = require('${cur}'); export { ${cur} as default }`
            }
        }
        return prev
    }, result)

    result['electron'] = () => {
        const electronModules = ['clipboard', 'ipcRenderer', 'nativeImage', 'shell', 'webFrame'].join(',')

        return {
            find: new RegExp(`^electron$`),
            code: `const { ${electronModules} } = require('electron'); export { ${electronModules} as default }`
        }
    }

    return result
}
