import { saveLog } from './log';

function vue(app) {
  app.config.errorHandler = (err, vm, info) => {
    const { message, stack } = err;
    saveLog({
      name: 'vue',
      message,
      stack
    });
  };
}

export default vue;
