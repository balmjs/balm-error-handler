import { loadErrorLog } from './log';
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
      body
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

function logToServer() {
  const { debug, reportRate, reportEndpoint } = getConfig();

  if (debug) {
    alert('logToServer');
  }

  const logs = loadErrorLog();
  for (let i = 0, len = logs.length; i < len; i++) {
    if (Math.random() < reportRate) {
      const logData = logs[i];
      reportData(reportEndpoint, logData);
    }
  }
}

function reportScriptErrors() {
  window.addEventListener('unload', logToServer, false);
}

export default reportScriptErrors;
