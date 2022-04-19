import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Multiselect from '@vueform/multiselect'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = `http://localhost:3000/server/`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Authorization'] =
    'Bearer ' + process.env.VUE_APP_XHR_TOKEN

const app = createApp(App)

app.component('Multiselect', Multiselect)

app.use(store).use(router).mount('#app')
