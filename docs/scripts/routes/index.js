import Vue from 'vue';
import VueRouter from 'vue-router';
// Pages
import Home from '@/views/home';
const NotFound = () => import('@/views/not-found');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
];
const router = new VueRouter({
  routes
});

export default router;
