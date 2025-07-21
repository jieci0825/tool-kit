<script setup lang="ts">
import HomeContent from './components/home-content.vue'
import HomeHeader from './components/home-header.vue'
import HomeQuery from './components/home-query.vue'
</script>

<template>
    <div class="home-container">
        <HomeHeader />
        <HomeQuery />
        <HomeContent />
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
}
</style>
