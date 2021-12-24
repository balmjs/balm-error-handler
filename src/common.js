import { saveLog } from './log';
import { isProd } from './env';

function common({ name = 'common' }, target = window) {
  target.onerror = function (message, source, lineno, colno, error) {
    const msg = message.toLowerCase();

    if (msg.indexOf('script error') === -1) {
      saveLog({
        name,
        message,
        error: JSON.stringify(error)
      });

      if (isProd) {
        return true;
      }
    }
  };
}

export default common;
