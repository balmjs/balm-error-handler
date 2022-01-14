import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './main';

const history = createWebHashHistory();
const router = createRouter({
  history,
  routes
});

export default router;
