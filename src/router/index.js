import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import LoginJoin from "@/pages/LoginJoin.vue";
import InfoPage from "@/pages/InfoPage.vue";
const routes = [
  {
    path: '/',
    redirect: '/info',
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/info",
    name: "InfoPage",
    component: InfoPage,
  },
  {
    path: "/signup",
    name: "LoginJoin",
    component: LoginJoin,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
