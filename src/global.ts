declare global {
    interface Window {
        electronAPI: {
            myFunction: () => void
        }
    }
}
