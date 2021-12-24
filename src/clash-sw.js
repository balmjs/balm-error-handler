const CHECK_CRASH_INTERVAL = 10000;
const CRASH_THRESHOLD = 15000;

// TODO: Your log send service
function sendLog(data) {
  const url = 'xxx';
  fetch(url, {
    name: 'crash',
    data
  });
}

function equalObjectValue(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function initLogSWCrashWatch() {
  let pages = {};
  let timer;
  let sendData = {};

  function checkCrash() {
    const now = Date.now();
    Object.keys(pages).forEach((id) => {
      const page = pages[id];
      if (now - page.time > CRASH_THRESHOLD) {
        if (!equalObjectValue(sendData, pages[id].data)) {
          sendLog(pages[id].data);
          sendData = pages[id].data;
        }
        delete pages[id];
      }
    });
    if (Object.keys(pages).length === 0) {
      clearInterval(timer);
      timer = null;
    }
  }

  self.addEventListener('message', (e) => {
    const data = e.data;
    switch (data.type) {
      case 'heartbeat':
        pages[data.id] = {
          time: Date.now(),
          data: data.data
        };
        if (!timer) {
          timer = setInterval(() => {
            checkCrash();
          }, CHECK_CRASH_INTERVAL);
        }
        break;
      case 'unload':
        delete pages[data.id];
        break;
      case 'start':
        pages = {};
        break;
      default:
    }
  });
}

initLogSWCrashWatch();

// Usage: in your service-worker.js
// importScripts('https://your-cdn.com/clash-sw.js');
