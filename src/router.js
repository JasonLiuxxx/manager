
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from './components/login.vue'
import index from './components/index.vue'

const routes = [
    {
        path:'/login',
        component:login
    },
    {
        path:'/index',
        component:index
    }
]

const router = new VueRouter({
    routes
})

export default router