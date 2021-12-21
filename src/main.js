import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Home from "./pages/Home";
import Webcam from "./pages/Webcam";
import Todos from "./pages/Todos";
import GeoLocation from "./pages/GeoLocation";

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/webcam', component: Webcam },
  { path: '/todos', component: Todos },
  { path: '/geo-location', component: GeoLocation },
]

const router = new VueRouter({
  routes
})

new Vue({
  template: '<App></App>',
  router,
  components: {
    App,
  }
}).$mount('#app');
