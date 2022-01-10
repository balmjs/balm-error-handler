import { saveBehaviorLog } from '../monitoring';
import {
  onBeforeunload,
  executeAfterLoad,
  getPageHeight,
  getScrollTop,
  toPercent
} from '../utils';

let timer;
let startTime = 0;
let hasReport = false;
let pageHeight = 0;
let scrollTop = 0;
let viewportHeight = 0;

export default function onPageHeight() {
  window.addEventListener('scroll', onScroll);

  onBeforeunload(() => {
    const now = performance.now();

    saveBehaviorLog({
      name: 'page-height',
      data: {
        duration: now - startTime,
        value: toPercent((scrollTop + viewportHeight) / pageHeight)
      },
      startTime: now
    });
  });

  // 页面加载完成后初始化记录当前访问高度、时间
  executeAfterLoad(() => {
    startTime = performance.now();
    pageHeight = getPageHeight();
    scrollTop = getScrollTop();
    viewportHeight = window.innerHeight;
  });
}

function onScroll() {
  clearTimeout(timer);
  const now = performance.now();

  if (!hasReport) {
    hasReport = true;

    saveBehaviorLog({
      name: 'page-height',
      data: {
        duration: now - startTime,
        value: toPercent((scrollTop + viewportHeight) / pageHeight)
      },
      startTime: now
    });
  }

  timer = setTimeout(() => {
    hasReport = false;
    startTime = now;
    pageHeight = getPageHeight();
    scrollTop = getScrollTop();
    viewportHeight = window.innerHeight;
  }, 500);
}
