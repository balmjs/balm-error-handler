import { saveErrorLog } from '../monitoring/logger';
import { getConfig } from '../config';

function capturePromiseError() {
  const { printErrors } = getConfig();

  window.addEventListener('unhandledrejection', (event) => {
    const { reason, timeStamp } = event;

    saveErrorLog({
      name: 'promise',
      message: reason.stack || reason,
      startTime: timeStamp
    });

    if (printErrors) {
      event.preventDefault();
    }
  });
}

export default capturePromiseError;
