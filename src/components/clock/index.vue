<script setup lang="ts">
import { useDragWindow } from '@/hooks'
import FilpClock from './flip-clock/index.vue'
import { useEventListener } from '@vueuse/core'

type ClockPorps = {
    toolId: string
}
const props = defineProps<ClockPorps>()

let currentScale = 1
let scaleTimeout: any
const minScale = 0.5
const maxScale = 1.5

function handleWheel(e: WheelEvent) {
    const isCtrlKey = e.ctrlKey
    if (!isCtrlKey) {
        return
    }
    e.preventDefault()

    // 调整灵敏度
    const scaleFactor = 1 - e.deltaY * 0.001
    currentScale *= scaleFactor
    currentScale = Math.max(minScale, Math.min(maxScale, currentScale)) // 限制缩放范围
    // 格式化缩放值
    currentScale = Number(currentScale.toFixed(2))

    return

    // 即时缩放
    const container = document.querySelector('#clock-container') as HTMLElement
    container.style.transform = `scale(${currentScale})`
    container.style.transformOrigin = 'center'

    window.electronAPI.resizeWindowToScale({ scale: currentScale, toolId: props.toolId })
    return
    // 防抖处理，避免频繁IPC通信
    clearTimeout(scaleTimeout)
    scaleTimeout = setTimeout(() => {}, 100)
}

useEventListener(document, 'wheel', handleWheel, { passive: false })
useDragWindow('.clock')
</script>

<template>
    <div
        class="clock flex-center"
        id="clock-container"
    >
        <FilpClock />
    </div>
</template>

<style scoped lang="scss">
.clock {
    width: 100%;
    height: 100%;
    user-select: none;
}
</style>
