import { createWebHistory, createRouter } from "vue-router";
import Clientes from '@/views/clientes.vue'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const routes = [
    {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]; 

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;