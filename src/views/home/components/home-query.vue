<script setup lang="ts">
import { ref } from 'vue'
import { CategoryList, type ICategoryItem } from '../config/category.config'
import type { ICondition } from '../types'

type HomeQueryEmits = {
    (event: 'setCondition', value: Partial<ICondition>): void
}
const emits = defineEmits<HomeQueryEmits>()

const keyword = ref('')

type CategoryItemWithActive = ICategoryItem & {
    active: boolean
}
const categoryList = ref<CategoryItemWithActive[]>([])

function formatCategoryList() {
    categoryList.value = CategoryList.map(item => {
        let active = false
        if (item.id === 'all') {
            active = true
        }
        return { ...item, active }
    })
}
formatCategoryList()

const handleClick = (raw: CategoryItemWithActive) => {
    categoryList.value.forEach(item => {
        item.active = false
    })
    raw.active = true

    emits('setCondition', { category: raw.id })
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
                v-for="item in categoryList"
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
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .search-bar {
        width: 70%;
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
