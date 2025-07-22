declare global {
    interface Window {
        electronAPI: {
            // 打开工具窗口
            openToolWindow: (config: any) => Promise<void>

            // 检查是否为开发环境
            isDevelopment: () => Promise<boolean>
        }
    }
}

export {}
