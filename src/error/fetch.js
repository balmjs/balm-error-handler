import { saveErrorLog } from '../monitoring';

function captureFetchError() {
  const OriginalFetch = window.fetch;

  window.fetch = (...args) => {
    return OriginalFetch.apply(this, args)
      .then((response) => {
        return response.ok
          ? response
              .json()
              .then((result) => Promise.resolve(result))
              .catch(() => {
                saveErrorLog({
                  name: 'fetch',
                  message: response.statusText,
                  data: {
                    error: response,
                    ...args
                  }
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
                  message: result.message,
                  data: {
                    error: result,
                    ...args
                  }
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
          data: {
            error,
            ...args
          }
        });

        return Promise.reject(error);
      });
  };
}

export default captureFetchError;
