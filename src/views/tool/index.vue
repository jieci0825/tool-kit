<script setup lang="ts">
import type { Component } from 'vue'
import Clock from '@/components/clock/index.vue'

type ToolPorps = {
    toolId: string
}
const props = defineProps<ToolPorps>()

const componentMap: { [key in string]: Component } = {
    clock: Clock
}
</script>

<template>
    <component :is="componentMap[props.toolId]" />
</template>

<style scoped lang="scss"></style>
