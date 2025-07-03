import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mianWindow = null
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取资源基础路径
function getResourcePath() {
    if (process.argv[2]) {
        // 开发环境：返回源代码路径
        return 'src/assets'
    } else {
        // 生产环境：返回打包后的资源路径
        if (app.isPackaged) {
            // 已打包的应用：使用 extraResources 路径
            return join(process.resourcesPath, 'assets/music')
        } else {
            // 未打包的生产构建：使用 dist 目录
            return join(__dirname, '../dist/renderer/assets/music')
        }
    }
}

// 检查是否为开发环境
function isDevelopment() {
    // 判断是否有第二个命令行参数，如果有则认为是开发环境
    return !!process.argv[2]
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 550,
        minWidth: 800,
        minHeight: 550,
        titleBarStyle: 'hidden'
    })

    // 区分开发和生产环境
    if (isDevelopment()) {
        // 开发环境：加载开发服务器 URL
        win.loadURL(process.argv[2])
    } else {
        // 生产环境：加载本地 HTML 文件
        win.loadFile(join(__dirname, '../dist/renderer/index.html'))
    }

    return win
}

app.whenReady().then(() => {
    mianWindow = createWindow()

    ipcMain.handle('is-development', () => {
        return isDevelopment()
    })

    // 注册 f12 调试
    globalShortcut.register('F12', () => {
        const currentWindow = BrowserWindow.getFocusedWindow()
        if (currentWindow) {
            currentWindow.webContents.toggleDevTools()
        }
    })
})

// 注销快捷键和 IPC 处理器
app.on('will-quit', () => {
    globalShortcut.unregisterAll()
    ipcMain.removeAllListeners('get-music-path')
    ipcMain.removeAllListeners('is-development')
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
