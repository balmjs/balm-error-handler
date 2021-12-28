import { saveErrorLog } from './log';
import config from './config';

function promise() {
  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event;

    saveErrorLog({
      name: 'promise',
      reason
    });

    if (config.isProd) {
      event.preventDefault();
    }
  });
}

export default promise;
