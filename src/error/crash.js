import { v4 as getUUID } from 'uuid';
import delegate from 'delegate';

const HEART_INTERVAL = 10000;

const DEFAULT_OPTIONS = {
  collectData() {
    return {};
  }
};

class SWCrashService {
  constructor(options = {}) {
    if (!window.logCrashActions) {
      window.logCrashActions = [];
    }

    this.options = Object.assign(DEFAULT_OPTIONS, options);

    if (this.checkServiceWorker()) {
      this.init();
      this.recordAction();
    }
  }

  checkServiceWorker() {
    return navigator.serviceWorker && navigator.serviceWorker.controller;
  }

  init() {
    const sessionId = getUUID();

    const heartbeat = () => {
      // collectData 为传入自定义函数用于包装埋点数据，比如 url, UA 等
      const data = this.options.collectData({
        lastAction: window.libCollectorCrashActions
      });
      navigator.serviceWorker.controller.postMessage({
        type: 'heartbeat',
        id: sessionId,
        data
      });
    };

    document.addEventListener('DOMContentLoaded', () => {
      navigator.serviceWorker.controller.postMessage({
        type: 'start',
        id: sessionId
      });
    });

    window.addEventListener('beforeunload', () => {
      navigator.serviceWorker.controller.postMessage({
        type: 'unload',
        id: sessionId
      });
      clearInterval(heartbeat);
    });

    setInterval(heartbeat, HEART_INTERVAL);
    heartbeat();
  }

  recordAction() {
    delegate.bind(document, '[data-crash-action]', 'click', (e) => {
      lastAction = e.dataset.crashAction;
    });
  }
}

export default SWCrashService;
