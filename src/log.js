import db from './db';

function saveLog(...data) {
  const logData = {
    url: window.location.href,
    ...data
  };

  console.log(logData);
}

function loadLog() {}

export { saveLog, loadLog };
