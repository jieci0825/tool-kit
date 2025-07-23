import type { TCategoryIds } from './category.config'
import type { BrowserWindowConstructorOptions } from 'electron'

export interface IToolItem {
    name: string
    icon: string
    id: string
    category: TCategoryIds
    description: string
    link?: string
    windowOptions?: BrowserWindowConstructorOptions
}

export const ToolList: IToolItem[] = [
    {
        name: '翻页时钟',
        icon: 'icon-clock',
        id: 'clock',
        category: 'appearance',
        description: '如果你喜欢类似日历卡片翻动的时钟效果，你应该尝试一下',
        windowOptions: {
            width: 350,
            height: 60,
            resizable: false,
            transparent: false,
            frame: false,
            titleBarStyle: 'hidden',
            trafficLightPosition: { x: -100, y: -100 },
            fullscreen: false
        }
    },
    {
        name: '图片压缩',
        icon: 'icon-img-compress',
        id: 'compress',
        category: 'useful',
        description: '一款简单的图片压缩工具，支持批量处理'
    },
    {
        name: 'JSON 格式化',
        icon: 'icon-json',
        id: 'json',
        category: 'develop',
        description: '支持 JSON 格式化、压缩、美化、解析、校验、生成'
    },
    {
        name: 'Todo',
        icon: 'icon-todo',
        id: 'todo',
        category: 'useful',
        description: '一个简单的 Todo 应用，支持增删改查，支持拖拽排序'
    },
    {
        name: 'Lorem Picsum',
        icon: 'icon-network',
        id: 'random-img',
        category: 'resource',
        description: '一般我在开发时，需要图片来填充网站内容时，会使用这个站点',
        link: 'https://picsum.photos/'
    },
    {
        name: '剪贴板',
        icon: 'icon-clipboard',
        id: 'clipboard',
        category: 'useful',
        description: '支持持久化存储的剪贴板，可预览、可批量操作'
    },
    {
        name: '字体包',
        icon: 'icon-network',
        id: 'font',
        category: 'resource',
        link: 'https://pan.baidu.com/s/1N6cC-Rn2UOMDF13rw3OyZg?pwd=qwer',
        description: '一些我个人收集的编程字体文件'
    },
    {
        name: '视频去水印',
        icon: 'icon-video-watermark',
        id: 'video',
        category: 'useful',
        description: '复制分享链接，一键去除平台水印，支持抖音'
    }
] as const
