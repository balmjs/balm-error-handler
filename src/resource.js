import { saveErrorLog } from './log';

function resource() {
  window.addEventListener(
    'error',
    (event) => {
      const target = event.target || event.srcElement;
      const isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement;

      if (!isElementTarget) return false;
      const src = target.src || target.href;

      const { path } = event;

      saveErrorLog({
        name: 'resource',
        src,
        path
      });
    },
    true
  );
}

export default resource;
