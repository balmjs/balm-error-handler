import lifecycle from 'page-lifecycle';
import db from './db';
import { getConfig } from './config';

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
    const src = `${url}?log=${dataStr}`;
    if (src.length < 2083) {
      reportByImage(src);
    } else {
      reportByAjax(url, data);
    }
  }
};

async function logToServer() {
  const { debug, reportRate, reportEndpoint } = getConfig();

  if (debug) {
    console.log('before logToServer');
  }

  const count = await db.logs.count().catch((e) => {
    console.error('count error', e);
  });

  if (count) {
    await db.logs.each((logData) => {
      if (Math.random() < reportRate) {
        reportData(reportEndpoint, logData);
      }
    });

    await db.logs.clear();
  }

  if (debug) {
    console.log('after logToServer');
  }
}

function reportScriptErrors() {
  const { debug } = getConfig();

  lifecycle.addEventListener('statechange', ({ newState }) => {
    if (debug) {
      console.log(newState);
    }
    if (newState === 'hidden') {
      logToServer();
    }
  });
}

export default reportScriptErrors;
