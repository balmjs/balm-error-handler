import saveErrorLog from './log';
import { getConfig } from './config';

function promise() {
  const { printErrors } = getConfig();

  window.addEventListener('unhandledrejection', (event) => {
    const { reason } = event;

    saveErrorLog({
      name: 'promise',
      message: 'unhandled rejection',
      error: reason
    });

    if (printErrors) {
      event.preventDefault();
    }
  });
}

export default promise;
