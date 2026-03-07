import { createApp } from 'vue'

import App from './App.vue' //Huvudkomponent som håller ihop hela appen
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
