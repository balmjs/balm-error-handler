import saveErrorLog from './log';

function http() {
  const originFetch = window.fetch;

  window.fetch = (...args) => {
    return originFetch
      .apply(this, args)
      .then((response) => {
        return response.ok
          ? response
              .json()
              .then((result) => Promise.resolve(result))
              .catch(() => {
                saveErrorLog({
                  name: 'fetch',
                  message: 'response ok',
                  error: response,
                  ...args
                });

                return Promise.resolve({
                  status: response.status,
                  message: response.statusText
                });
              })
          : response
              .text()
              .then((result) => JSON.parse(result))
              .then((result) => {
                saveErrorLog({
                  name: 'fetch',
                  message: 'response error',
                  error: result,
                  ...args
                });

                return Promise.reject({
                  status: result.status,
                  message: result.message
                });
              });
      })
      .catch((error) => {
        saveErrorLog({
          name: 'fetch',
          message: 'request error',
          error,
          ...args
        });

        return Promise.reject(error);
      });
  };
}

export default http;
