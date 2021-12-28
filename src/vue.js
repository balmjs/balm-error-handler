import { saveErrorLog } from './log';

function vue(app) {
  app.config.errorHandler = (err, vm, info) => {
    const { message, stack } = err;
    saveErrorLog({
      name: 'vue',
      message,
      stack
    });
  };
}

export default vue;
