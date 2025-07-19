<script setup lang="ts">
import { effect, ref } from 'vue'
import { CategoryList, type ICategoryItem } from '../config/category.config'

const keyword = ref('')

type ICategoryItemWithActive = ICategoryItem & {
    active: boolean
}
const _categoryList = ref<ICategoryItemWithActive[]>([])

function formatCategoryList() {
    _categoryList.value = CategoryList.map(item => {
        let active = false
        if (item.id === 'all') {
            active = true
        }
        return { ...item, active }
    })
}
formatCategoryList()

const handleClick = (raw: ICategoryItemWithActive) => {
    _categoryList.value.forEach(item => {
        item.active = false
    })
    raw.active = true
}
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
            <el-tag
                type="primary"
                v-for="item in _categoryList"
                :key="item.id"
                :effect="item.active ? 'dark' : 'plain'"
                @click="handleClick(item)"
                >{{ item.name }}</el-tag
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.query-wrapper {
    margin: 20px auto;
    flex-direction: column;
    gap: 10px;

    .search-bar {
        width: 50%;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .category-list {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        .el-tag {
            cursor: pointer;
        }
    }
}
</style>
