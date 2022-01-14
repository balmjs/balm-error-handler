import { createApp } from 'vue';
import router from '@/routes';
import $http from '@/plugins/http';
import $prism from '@/plugins/prism';
import App from '@/views/layouts/app';
import balmTracking from 'balm-tracking';
// BalmUI
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
// Custom components
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';

function createBalmTrackingApp() {
  const app = createApp(App);

  balmTracking({
    debug: true,
    reportEndpoint: 'http://localhost:8080/log',
    reportRate: 1.0,
    reportThreshold: 100,
    vue: {
      app,
      router
    }
  });

  app.use(router);
  app.use($http);
  app.use($prism);
  app.use(BalmUI);
  app.use(BalmUIPlus);

  app.component(UiMarkdown.name, UiMarkdown);
  app.component(UiSnippet.name, UiSnippet);

  app.mount('#app');
}

export default createBalmTrackingApp;
