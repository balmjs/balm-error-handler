import db from './db';

function saveErrorLog(...data) {
  const logData = {
    url: window.location.href,
    ...data
  };

  console.log(logData);
}

function loadErrorLog() {}

export { saveErrorLog, loadErrorLog };
