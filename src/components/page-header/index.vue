<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

let isDragging = false
const offset = { x: 0, y: 0 }

function handleMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target) return

    // 匹配页面头部元素，及其子元素
    if (target.matches('.page-header, .page-header *')) {
        isDragging = true
        // event.screenX 是鼠标相对于屏幕的坐标
        // window.screenX 是窗口相对于屏幕的坐标

        // 记录鼠标相对于窗口的坐标
        offset.x = event.screenX - window.screenX
        offset.y = event.screenY - window.screenY
    }
}

function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return
    const { screenX, screenY } = event
    window.moveTo(screenX - offset.x, screenY - offset.y)
}

function handleMouseUp() {
    isDragging = false
    offset.x = 0
    offset.y = 0
}

useEventListener(document, 'mousedown', handleMouseDown)
useEventListener(document, 'mousemove', handleMouseMove)
useEventListener(document, 'mouseup', handleMouseUp)
</script>

<template>
    <div class="page-header"></div>
</template>

<style scoped lang="scss">
.page-header {
    width: 100%;
    height: 30px;
    background-color: var(--bg-color);
}
</style>
