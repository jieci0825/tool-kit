import { useEventListener } from '@vueuse/core'

/**
 * 拖拽窗口的 hook
 * @param selector 匹配元素的选择器字符串，例如 '.page-header'
 */
export function useDragWindow(selector: string) {
    let isDragging = false
    const offset = { x: 0, y: 0 }

    function handleMouseDown(event: MouseEvent) {
        const target = event.target as HTMLElement
        if (!target) return

        // 匹配指定选择器的元素及其子元素
        if (target.matches(`${selector}, ${selector} *`)) {
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

    // 注册事件监听器
    useEventListener(document, 'mousedown', handleMouseDown)
    useEventListener(document, 'mousemove', handleMouseMove)
    useEventListener(document, 'mouseup', handleMouseUp)
}
