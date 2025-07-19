<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<template>
    <div class="query-wrapper flex-center">
        <div class="search-bar">
            <el-input
                v-model="keyword"
                placeholder="请输入工具名称"
            ></el-input>
            <el-button type="primary">搜索</el-button>
        </div>
        <div class="category-list">
            <div class="category-item">工具1</div>
            <div class="category-item">工具2</div>
            <div class="category-item">工具3</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.query-wrapper {
    margin: 20px auto;
    flex-direction: column;
    .search-bar {
        width: 50%;
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
