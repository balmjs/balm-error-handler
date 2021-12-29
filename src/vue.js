import saveErrorLog from './log';

function vue(app) {
  app.config.errorHandler = (err, vm, info) => {
    const { message, stack } = err;
    saveErrorLog({
      name: 'vue',
      message,
      error: stack
    });
  };
}

export default vue;
