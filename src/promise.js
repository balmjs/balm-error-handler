import { saveLog } from './log';
import { isProd } from './env';

function promise() {
  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event;

    saveLog({
      name: 'promise',
      reason
    });

    if (isProd) {
      event.preventDefault();
    }
  });
}

export default promise;
