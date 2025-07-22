<script setup lang="ts">
import PageHeader from '@/components/page-header/index.vue'
</script>

<template>
    <div class="container">
        <PageHeader />
        <div class="main">
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
    }
}
</style>
