import db from './db';
import { getConfig } from './config';

function reportBySendBeacon(url, data) {
  navigator.sendBeacon(url, data);
}

function reportByImage(src) {
  const reportImg = new Image();
  reportImg.src = src;
}

function reportByAjax(url, data) {
  const method = 'POST';
  const contentType = 'application/json;charset=UTF-8';
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
    const src = `${url}?log=${dataStr}`;
    if (src.length < 2083) {
      reportByImage(src);
    } else {
      reportByAjax(url, data);
    }
  }
};

async function logToServer() {
  console.log('logToServer');
  const count = await db.logs.count();

  if (count) {
    const { debug, reportRate, reportEndpoint } = getConfig();

    await db.logs.each((logData) => {
      if (Math.random() < reportRate) {
        reportData(reportEndpoint, logData);
      }
    });

    // db.logs.clear();
  }
}

function reportScriptErrors() {
  const event = navigator.sendBeacon ? 'unload' : 'beforeunload';
  window.addEventListener(event, logToServer, false);
}

export default reportScriptErrors;
