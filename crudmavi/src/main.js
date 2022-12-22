import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/'

var token = localStorage.getItem('token');
if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
}

createApp(App).use(router).use(VueAxios, axios).mount('#app')
