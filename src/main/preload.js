const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // 打开工具窗口
    openToolWindow: config => ipcRenderer.invoke('open-tool-window', config),

    // 检查是否为开发环境
    isDevelopment: () => ipcRenderer.invoke('is-development'),

    // 缩放窗口
    resizeWindowToScale: payload => ipcRenderer.send('resize-window-to-scale', payload)
})
