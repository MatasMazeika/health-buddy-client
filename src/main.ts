import { createApp } from 'vue';
import 'bulma';
import './mainBulma.scss';
import './main.scss';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import App from './App.vue';

import router from './router';

createApp(App).use(router).mount('#app');
