<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/page-header/index.vue'

const route = useRoute()

// 根据路由元信息判断是否显示 PageHeader
const shouldShowPageHeader = computed(() => {
    return !route.meta.hidePageheader
})
</script>

<template>
    <div class="container">
        <PageHeader v-if="shouldShowPageHeader" />
        <div
            class="main"
            :class="{ 'full-height': !shouldShowPageHeader }"
        >
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .main {
        width: 100%;
        height: calc(100% - 30px);
        overflow: hidden;

        &.full-height {
            height: 100%;
        }
    }
}
</style>
