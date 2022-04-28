import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import axios from 'axios'
import Login from '../views/Login'
import NotFound from '../views/NotFound'

const routes = [
    {
        path: '/app',
        name: 'AppDash',
        component: () => import('../views/AppDash'), // Lazy loading this component because of all the data
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/guest',
        name: 'Guest',
        component: () => import('../views/Guest')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
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

const checkSession = async (to, next) => {
    const options = {
        method: 'POST',
        data: JSON.stringify({
            path: 'authentication/authSession'
        })
    }
    const resp = await axios.request(options)
    if (resp.data.status === 'Success: 200 (Session authenticated)') {
        await store.dispatch('setUser', {
            isAdmin: resp.data.body.user === 2 ? true : false
        })
        await next()
    } else {
        await next('/login')
    }
}

router.beforeEach((to, from, next) => {
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !store.getters.hasLoggedIn
    ) {
        checkSession(to, next).catch((err) => alert(err))
    } else {
        next()
    }
})

export default router
