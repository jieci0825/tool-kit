export interface ICategoryItem {
    name: string
    icon?: string
    id: string
}

export const CategoryList: ICategoryItem[] = [
    { name: '全部', id: 'all' },
    { name: '外观', id: 'appearance' },
    { name: '工作', id: 'work' },
    { name: '实用', id: 'useful' },
    { name: '资源', id: 'resource' }
]
