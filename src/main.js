import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router).mount('#app');
export const LOADING_STATUS = 'LOADING_STATUS'