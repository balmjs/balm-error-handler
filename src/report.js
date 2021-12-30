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

const reportData = (event, url, data) => {
  if (navigator.sendBeacon) {
    if (document.visibilityState === 'hidden') {
      reportBySendBeacon(url, data);
    }
  } else {
    if (event.persisted) {
      const dataStr = JSON.stringify(data);
      const src = `${url}?log=${dataStr}`;
      if (src.length < 2083) {
        reportByImage(src);
      } else {
        reportByAjax(url, data);
      }
    }
  }
};

function logToServer(event) {
  const { debug, reportRate, reportEndpoint } = getConfig();

  if (debug) {
    console.log('logToServer');
  }

  const count = db.logs.count();

  if (count) {
    db.logs.each((logData) => {
      if (Math.random() < reportRate) {
        reportData(event, reportEndpoint, logData);
      }
    });

    // db.logs.clear();
  }

  if (debug) {
    db.logs.add({
      name: 'unload',
      message: 'gg'
    });
  }

  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
}

function reportScriptErrors() {
  const event = navigator.sendBeacon ? 'visibilitychange' : 'pagehide';
  window.addEventListener(event, logToServer, false);
}

export default reportScriptErrors;
