const { contextBridge } = require('electron')

console.log('preload.js')

contextBridge.exposeInMainWorld('electronAPI', {
    aaa: 111
})
