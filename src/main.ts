import './assets/main.scss'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }
}

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount('#app')
