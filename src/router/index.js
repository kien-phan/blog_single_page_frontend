import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import HomePage from '../components/HomePage.vue'
const routes = [
    {
        path: '/login', component: Login, name: 'login'
    },
    {
        path: '/register', component: Register
    },
    {
        path: '/dashboard', component: Dashboard, name: 'dashboard'
    },
    {
        path: '/', component: HomePage, name: 'HomePage'
    }
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router