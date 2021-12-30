import saveErrorLog from './log';

function vue(app, router = null) {
  app.config.errorHandler = (err, vm, info) => {
    const { message, stack } = err;
    saveErrorLog({
      name: 'vue',
      message,
      error: stack
    });

    // TODO
    // saveErrorLog({
    //   name: 'router',
    //   from: '',
    //   to: ''
    // });
  };
}

export default vue;
