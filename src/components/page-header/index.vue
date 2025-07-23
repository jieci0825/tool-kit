<script setup lang="ts">
import { useDragWindow } from '@/hooks'

useDragWindow('.page-header')
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
