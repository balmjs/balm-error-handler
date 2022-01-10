// import lifecycle from 'page-lifecycle';
import db from './db';
import { getConfig } from './config';
import { onBeforeunload, onHidden } from '../utils';

const contentType = 'application/json; charset=UTF-8';

function reportBySendBeacon(url, data) {
  const blob = new Blob([JSON.stringify(data)], {
    type: contentType
  });
  navigator.sendBeacon(url, blob);
}

function reportByImage(src) {
  const reportImg = new Image();
  reportImg.src = src;
}

function reportByAjax(url, data) {
  const method = 'POST';
  const body = JSON.stringify(data);

  if (window.fetch) {
    fetch(url, {
      method,
      headers: {
        'Content-Type': contentType
      },
      body,
      keepalive: true
    });
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.send(body);
  }
}

const reportData = (url, data) => {
  if (navigator.sendBeacon) {
    reportBySendBeacon(url, data);
  } else {
    const dataStr = JSON.stringify(data);
    const src = `${url}?data=${dataStr}`;
    if (src.length < 2083) {
      reportByImage(src);
    } else {
      reportByAjax(url, data);
    }
  }
};

async function logToServer() {
  const { debug, reportRate, reportEndpoint } = getConfig();

  const count = await db.logs.count().catch((e) => {
    console.error('count error', e);
  });

  if (debug) {
    console.log('logToServer', count);
  }

  if (count) {
    let logData = [];

    await db.logs.each((log) => {
      if (Math.random() < reportRate) {
        logData.push(log);
      }
    });

    if (debug) {
      console.log('report', logData.length);
    }

    if (logData.length) {
      reportData(reportEndpoint, logData);
    }

    db.logs.clear();
  }
}

function report() {
  const { debug } = getConfig();

  // lifecycle.addEventListener('statechange', ({ newState }) => {
  //   if (debug) {
  //     console.log(newState);
  //   }
  //   if (newState === 'hidden') {
  //     logToServer();
  //   }
  // });

  // 当页面进入后台或关闭前时，将所有的 cache 数据进行上报
  [onBeforeunload, onHidden].forEach((fn) => {
    fn(() => {
      if (debug) {
        console.log('gg');
      }
      logToServer();
    });
  });
}

export default report;
export { logToServer };
