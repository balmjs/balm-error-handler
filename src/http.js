import { saveLog } from './log';

function http(fn = () => {}) {
  const originFetch = window.fetch;
  const message = 'fetch request error';

  window.fetch = (...args) => {
    return originFetch
      .apply(this, args)
      .then((response) => {
        if (!response.ok) {
          throw new Error(message);
        }
        return response;
      })
      .catch((error) => {
        saveLog({
          name: 'fetch',
          message,
          error,
          ...args
        });

        return {
          message
        };
      });
  };

  fn();
}

export default http;
