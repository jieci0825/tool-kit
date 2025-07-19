<script setup lang="ts">
import HomeHeader from './components/home-header.vue'
import HomeQuery from './components/home-query.vue'
</script>

<template>
    <div class="home-container">
        <HomeHeader />
        <HomeQuery />
        <div class="content-wrapper"></div>
    </div>
</template>

<style scoped lang="scss">
.home-container {
    width: 100%;
    height: 100%;
}
</style>
