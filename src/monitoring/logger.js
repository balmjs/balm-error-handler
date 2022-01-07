import { v4 as getUUID } from 'uuid';
import db from './db';
import { getConfig } from '../config';

async function saveLog(type, data = {}) {
  const { debug } = getConfig();

  const logData = Object.assign(
    {
      type,
      name: '',
      message: ''
    },
    {
      uuid: getUUID(),
      pageURL: location.href,
      userAgent: navigator.userAgent,
      startTime: performance.now()
    },
    data
  );

  try {
    await db.logs.add(logData);

    if (debug) {
      console.log('Log saved:', logData);
    }

    // TODO: auto report
  } catch (e) {
    console.error(`Save failed: ${e}`);
  }
}

function savePerformanceLog(data = {}) {
  saveLog('performance', data);
}

function saveErrorLog(data = {}) {
  saveLog('error', data);
}

function saveBehaviorLog(data = {}) {
  saveLog('behavior', data);
}

export default saveLog;
export { savePerformanceLog, saveErrorLog, saveBehaviorLog };
