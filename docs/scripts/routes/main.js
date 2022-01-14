import Home from '@/views/home';
// Layouts
import BlankLayout from '@/views/layouts/blank';
// Routes
import demosRoutes from './demos';
// Pages
const NotFound = () => import('@/views/not-found');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/demos',
    name: 'demos',
    redirect: '/demos/simple',
    component: BlankLayout,
    children: demosRoutes
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default routes;
