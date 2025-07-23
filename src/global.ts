declare global {
    interface Window {
        electronAPI: {
            openToolWindow: (config: any) => Promise<void>
            isDevelopment: () => Promise<boolean>
            resizeWindowToScale: (payload: any) => void
        }
    }
}

export {}
