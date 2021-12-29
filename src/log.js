import db from './db';
import { getConfig } from './config';

async function saveErrorLog(data = {}) {
  const { debug } = getConfig();

  const logData = {
    url: window.location.href,
    ...data
  };

  try {
    await db.logs.add(logData);

    if (debug) {
      console.log('Log saved:', logData);
    }
  } catch (e) {
    console.error(`Save failed: ${e}`);
  }
}

function loadErrorLog() {}

export { saveErrorLog, loadErrorLog };
