<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<template>
    <div class="home-container">
        <div class="header-wrapper">
            <div class="title">工具箱</div>
            <div class="description">一个简单的工具箱</div>
        </div>

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

        <div class="content-wrapper"></div>
    </div>
</template>

<style scoped lang="scss">
.home-container {
    width: 100%;
    height: 100%;
    .header-wrapper {
        padding-top: 20px;
        .title {
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            color: var(--title-primary-color);
        }
        .description {
            font-size: 16px;
            text-align: center;
            margin-top: 5px;
            color: var(--title-secondary-color);
        }
    }
    .query-wrapper {
        margin: 30px auto;
        flex-direction: column;
        .search-bar {
            width: 50%;
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
}
</style>
