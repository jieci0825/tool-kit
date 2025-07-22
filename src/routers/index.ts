import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/home/index.vue')
        },
        {
            path: '/tool/:toolId',
            name: 'Tool',
            component: () => import('@/views/tool/index.vue'),
            props: true,
            meta: {
                hidePageheader: true
            }
        }
    ]
})

export default router
