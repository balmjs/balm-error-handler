import { saveErrorLog } from './log';
import config from './config';

function common(name = 'common') {
  const target = name === 'iframe' ? window.frames[0] : window;

  if (target) {
    target.onerror = function (message, source, lineno, colno, error) {
      const msg = message.toLowerCase();

      if (msg.indexOf('script error') === -1) {
        saveErrorLog({
          name,
          message,
          error: JSON.stringify(error)
        });

        if (config.isProd) {
          return true;
        }
      }
    };
  }
}

export default common;
