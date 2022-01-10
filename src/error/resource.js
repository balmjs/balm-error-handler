import { saveErrorLog } from '../monitoring';
import { getPaths } from '../utils';

function captureResourceError() {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target;
      if (!target) return;

      const isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement;
      if (!isElementTarget) return false;

      const url = target.src || target.href;
      if (url) {
        const { path, timeStamp } = event;

        saveErrorLog({
          name: 'resource',
          message: url,
          data: {
            html: target.outerHTML,
            resourceType: target.tagName,
            paths: getPaths(path)
          },
          startTime: timeStamp
        });
      }
    },
    true
  ); // 关于这里为什么不可以用 e.preventDefault() 来阻止默认打印，是因为这个错误，我们是捕获阶段获取到的，而不是冒泡
}

export default captureResourceError;
