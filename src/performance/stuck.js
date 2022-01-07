import { savePerformanceLog } from '../monitoring/logger';

const rAF = (() => {
  const requestAnimationFrame = window.requestAnimationFrame;
  if (requestAnimationFrame) {
    return (cb) => {
      const timer = requestAnimationFrame(() => {
        cb();
        window.cancelAnimationFrame(timer);
      });
    };
  }
})();

const ONE_SECOND = 1e3;

function captureStuck() {
  const stuckData = [];
  const startTime = Date.now();

  const loop = (startCountTime = Date.now(), lastFrameCount = 0) => {
    const now = Date.now();
    // 每一帧进来，计数一次
    const nowFrameCount = lastFrameCount + 1;
    // 大于等于一秒钟为一个周期；比如如果是正常的fps：那当第61次时，即1017毫秒，这里就满足
    if (now > ONE_SECOND + startCountTime) {
      // 计算一秒钟的fps：当前计数总次数 / 经过的时长；
      const timeInterval = (now - startCountTime) / ONE_SECOND;
      const fps = Math.round(nowFrameCount / timeInterval);
      if (fps > 30) {
        // fps 小于30 判断为卡顿
        stuckData.pop();
      } else {
        stuckData.push(fps);
      }
      // 连续三次小于 30 上报卡顿（还有一种特殊情况，前面2次卡顿，第三次不卡，接着再连续两次卡顿，也满足）
      if (stuckData.length === 3) {
        const time = `${now - startTime}ms`;

        savePerformanceLog({
          name: 'stuck',
          message: time
        });

        // 清空采集到的卡顿数据
        stuckData.length = 0;
      }
      // 即休息一个周期（我这里定义的是一分钟），重新开启采样
      const timer = setTimeout(() => {
        loop();
        clearTimeout(timer);
      }, 60 * ONE_SECOND);
      return;
    }
    rAF(() => loop(startCountTime, nowFrameCount));
  };

  loop();
}

export default captureStuck;
