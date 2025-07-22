export interface ICategoryItem {
    name: string
    icon?: string
    id: TCategoryIds
}

export const CategoryList = [
    { name: '全部', id: 'all' },
    { name: '外观', id: 'appearance' },
    { name: '开发', id: 'develop' },
    { name: '实用', id: 'useful' },
    { name: '资源', id: 'resource' }
] as const

export type TCategoryIds = (typeof CategoryList)[number]['id']
