import { createApp } from 'vue';
import router from '@/routes';
import $http from '@/plugins/http';
import $prism from '@/plugins/prism';
import App from '@/views/layouts/app';
import BalmUI from 'balm-ui-source';
import BalmUIPlus from 'balm-ui-plus';
import { customComponents } from '@/config/components';
import balmTracking from 'balm-tracking';

function createBalmTrackingApp() {
  const app = createApp(App);

  // balmTracking({
  //   debug: true,
  //   reportEndpoint: 'http://localhost:8080/log',
  //   reportRate: 1.0,
  //   reportThreshold: 100,
  //   vue: {
  //     app,
  //     router
  //   }
  // });

  app.use(router);
  app.use($http);
  app.use($prism);
  app.use(BalmUI);
  app.use(BalmUIPlus);
  customComponents.forEach((component) =>
    app.component(component.name, component)
  );

  app.mount('#app');
}

export default createBalmTrackingApp;
