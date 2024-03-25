import { createRouter, createWebHistory } from 'vue-router'
import InfoPage from "@/pages/InfoPage.vue";
const routes = [
  {
    path: '/',
    redirect: '/info',
  },
  {
    path: "/info",
    name: "InfoPage",
    component: InfoPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
