import { saveBehaviorLog } from '../monitoring/logger';
import { getPageHeight, getScrollTop, getPaths } from '../utils';

function onClick() {
  ['mousedown', 'touchstart'].forEach((eventType) => {
    let timer;

    window.addEventListener(eventType, (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const { target, path, timeStamp } = event;
        const { top, left } = target.getBoundingClientRect();

        saveBehaviorLog({
          name: 'click',
          data: {
            eventType,
            top,
            left,
            pageHeight: getPageHeight(),
            scrollTop: getScrollTop(),
            target: target.tagName,
            paths: getPaths(path),
            startTime: timeStamp,
            outerHTML: target.outerHTML,
            innerHTML: target.innerHTML,
            width: target.offsetWidth,
            height: target.offsetHeight,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            }
          }
        });
      }, 500);
    });
  });
}

export default onClick;
