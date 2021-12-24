import '@/polyfill';
import Vue from 'vue';
import router from '@/routes';
import $http from '@/plugins/http';
import App from '@/views/layouts/app';
import prismjs from 'prismjs';
// BalmUI
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
// Custom components
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import VEditor from '@/components/editor';

function createApp() {
  Vue.prototype.$prism = prismjs;

  Vue.use($http);
  Vue.use(BalmUI);
  Vue.use(BalmUIPlus);

  Vue.component(UiMarkdown.name, UiMarkdown);
  Vue.component(UiSnippet.name, UiSnippet);
  Vue.component(VEditor.name, VEditor);

  new Vue({
    el: '#app',
    components: {
      App
    },
    router,
    template: '<app />'
  });
}

export default createApp;
