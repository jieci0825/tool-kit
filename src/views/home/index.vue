<script setup lang="ts">
import HomeContent from './components/home-content.vue'
import HomeHeader from './components/home-header.vue'
import HomeQuery from './components/home-query.vue'
import { ref } from 'vue'
import type { ICondition } from './types'

const condition = ref<ICondition>({
    category: 'all',
    keyword: ''
})

const setCondition = (newCondition: Partial<ICondition>) => {
    condition.value = { ...condition.value, ...newCondition }
}
</script>

<template>
    <div class="home-container">
        <HomeHeader />
        <HomeQuery @set-condition="setCondition" />
        <HomeContent :condition="condition" />
    </div>
</template>

<style scoped lang="scss">
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    overflow: auto;
    padding: 20px 0;
    background-color: var(--bg-color);
}
</style>
