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
        message: src,
        error: path
      });
    },
    true
  ); // 关于这里为什么不可以用 e.preventDefault() 来阻止默认打印，是因为这个错误，我们是捕获阶段获取到的，而不是冒泡
}

export default resource;
