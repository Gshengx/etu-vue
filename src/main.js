import { createApp, h } from 'vue'
// import App from './App.vue'
import Route from './router'
const NotFoundComponent = { template: '<p>Page not found</p>' }
const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      let currentRoute = Route.find((i) => i.path === this.currentRoute)
      console.log(currentRoute)
      return currentRoute ? currentRoute.component : NotFoundComponent
    },
  },

  render() {
    return h(this.CurrentComponent)
  },
}

createApp(SimpleRouter).mount('#app')
