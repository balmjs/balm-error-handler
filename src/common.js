import { saveErrorLog } from './log';
import { getConfig } from './config';

function common(name = 'common') {
  const target = name === 'iframe' ? window.frames[0] : window;

  if (target) {
    const { printErrors } = getConfig();

    target.onerror = function (message, source, lineno, colno, error) {
      const msg = message.toLowerCase();

      if (msg.indexOf('script error') === -1) {
        saveErrorLog({
          name,
          message,
          error: JSON.stringify(error)
        });

        if (printErrors) {
          return true; // 异常不继续冒泡，浏览器默认打印机制就会取消
        }
      }
    };
  }
}

export default common;
