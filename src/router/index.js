import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login'
import Users from "../views/user/Users";
import GoogleSheets from "../views/sheet/GoogleSheets";
import Stocks from "../views/stocks/Stocks";
import CreateStock from "../views/stocks/CreateStock";
import Plans from "../views/plan/Plans";
import CreatePlan from "../views/plan/CreatePlan";
import Orders from "../views/orders/Orders";
import Chat from "../views/support/Chat";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/users',
        name: 'users',
        component: Users
    },
    {
        path: '/sheets',
        name: GoogleSheets.name,
        component: GoogleSheets
    },
    {
        path: '/stocks',
        name: Stocks.name,
        component: Stocks
    },
    {
        path: '/stocks/create',
        name: CreateStock.name,
        component: CreateStock
    },
    {
        path: '/stocks/:stockId',
        name: 'EditStock',
        component: CreateStock
    },
    {
        path: '/stocks/:stockId',
        name: 'RenewStock',
        component: CreateStock
    },
    {
        path: '/plans',
        name: 'Plans',
        component: Plans
    },
    {
        path: '/plans/create',
        name: 'CreatePlan',
        component: CreatePlan
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/support/chat',
        name: Chat.name,
        component: Chat
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
