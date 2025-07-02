import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { devPlugin, getReplacer } from './plugins/dev.plugin'
// @ts-ignore
import optimizer from 'vite-plugin-optimizer'

// https://vite.dev/config/
export default defineConfig({
    plugins: [optimizer(getReplacer()), devPlugin(), vue()]
})
