<script setup lang="ts">
type ToolPorps = {
    toolId: string
}
const props = defineProps<ToolPorps>()
</script>

<template>
    <h1>工具界面-{{ props.toolId }}</h1>
</template>

<style scoped lang="scss"></style>
