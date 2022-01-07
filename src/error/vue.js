import { saveErrorLog } from '../monitoring/logger';

function captureVueError(app) {
  app.config.errorHandler = (err, vm, info) => {
    const { message, stack } = err;

    saveErrorLog({
      name: 'vue',
      message,
      data: {
        error: stack,
        info
      }
    });
  };
}

export default captureVueError;
