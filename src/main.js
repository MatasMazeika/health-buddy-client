import { createApp } from 'vue';
import 'bulma';
import './main.scss';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';
import TextareaAutosize from 'vue-textarea-autosize';
import App from './App.vue';

import router from './router';

createApp(App).use(router).use(TextareaAutosize).mount('#app');
