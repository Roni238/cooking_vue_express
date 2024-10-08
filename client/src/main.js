import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components'
import directives from '@/directives';
import './css/variables.css';

const app = createApp(App)

components.forEach(component=>app.component(component.name,component))
directives.forEach(directive => app.directive(directive.name, directive))

app.use(store).use(router).mount('#app')