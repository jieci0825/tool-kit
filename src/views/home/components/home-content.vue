<script setup lang="ts">
import { computed, ref } from 'vue'
import { ToolList, type IToolItem } from '@/config/tool.config.ts'
import type { ICondition } from '../types'

type HomeContentProps = {
    condition: ICondition
}
const props = defineProps<HomeContentProps>()

type ToolItemWithEnable = IToolItem & {
    enable: boolean
}

const toolList = ref<ToolItemWithEnable[]>([])

function formatToolList() {
    toolList.value = ToolList.map(item => {
        let enable = false
        // TODO 处理初始状态
        return { ...item, enable }
    })
}
formatToolList()

const filterToolList = computed(() => {
    const { category, keyword } = props.condition

    return toolList.value.filter(item => {
        const matchCategory = category === 'all' || item.category === category
        const matchKeyword = keyword === '' || item.name.includes(keyword) || item.description.includes(keyword)
        return matchCategory && matchKeyword
    })
})

const openOutSideChain = (url: string) => {
    window.open(url, '_blank')
}

// 打开工具窗口
const openToolWindow = async (tool: IToolItem) => {
    try {
        // 解 ref
        const windowOptions = JSON.parse(JSON.stringify(tool.windowOptions || {}))

        await window.electronAPI?.openToolWindow({
            toolId: tool.id,
            toolName: tool.name,
            windowOptions
        })
    } catch (error) {
        console.error('打开工具窗口失败:', error)
        // 如果是在浏览器环境中（开发调试），则使用路由跳转
        if (!window.electronAPI) {
            // 在新标签页中打开工具
            const url = `${window.location.origin}${window.location.pathname}/tool/${tool.id}`
            window.open(url, '_blank')
        }
    }
}
</script>

<template>
    <div class="content-wrapper">
        <div
            class="tool-item"
            v-for="item in filterToolList"
            :key="item.id"
        >
            <div class="tool-item__top">
                <div class="top__icon flex-center">
                    <i
                        class="iconfont"
                        :class="[item.icon]"
                    ></i>
                </div>
                <div class="top__name">{{ item.name }}</div>
                <div class="top__status">
                    <el-tag
                        round
                        :type="item.enable ? 'success' : 'primary'"
                        >{{ item.enable ? '已启用' : '未启用' }}</el-tag
                    >
                </div>
            </div>
            <div class="tool-item__center">
                <div class="tool-item__desc">{{ item.description }}</div>
            </div>
            <div class="tool-item__bottom">
                <el-button
                    v-if="!!item.link"
                    type="primary"
                    @click="openOutSideChain(item.link)"
                    >点击访问</el-button
                >
                <el-button
                    v-else
                    type="primary"
                    @click="openToolWindow(item)"
                    >打开工具</el-button
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.content-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 20px;
    width: 90%;

    .tool-item {
        padding: 15px;
        border: var(--border);
        border-radius: var(--border-radius);
        background-color: var(--bg-active-color);
        display: flex;
        flex-direction: column;
        gap: 10px;

        &__top {
            display: flex;
            align-items: center;

            .top__icon {
                padding: 5px;
                border-radius: var(--border-radius);
                background-color: var(--bg-secondary-color);

                .iconfont {
                    font-size: 18px;
                    color: var(--text-secondary-color);
                }
            }

            .top__name {
                margin-left: 10px;
                flex: 1;
                font-size: 18px;
                font-weight: 600;
            }
        }

        &__center {
            padding: 10px 0;

            .tool-item__desc {
                height: 40px;
                font-size: 14px;
                @include multiline-ellipsis();
            }
        }

        &__bottom {
            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
