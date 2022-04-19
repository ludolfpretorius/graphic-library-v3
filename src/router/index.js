import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'

const routes = [
    {
        path: '/app',
        name: 'AppDash',
        component: () => import('../views/AppDash') // Lazy loading this component because of all the data
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    // Redirects
    {
        path: '/',
        redirect: '/app'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
