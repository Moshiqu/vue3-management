import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouters } from './router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouters,
    scrollBehavior: () => {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router