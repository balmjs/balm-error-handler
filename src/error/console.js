import { saveErrorLog } from '../monitoring';

function captureConsoleError() {
  const OriginalConsoleError = window.console.error;

  window.console.error = (...args) => {
    OriginalConsoleError.apply(this, args);

    saveErrorLog({
      name: 'console',
      message: args
    });
  };
}

export default captureConsoleError;
