import { saveErrorLog } from '../monitoring';

function capturePromiseError(printErrors) {
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
