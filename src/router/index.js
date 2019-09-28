import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'

Vue.use(Router)

const router = new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.fullPath !== '/') {
        next('/')
    } else {
        next()
    }
})

export default router
