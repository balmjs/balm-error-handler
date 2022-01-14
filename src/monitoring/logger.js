import { v4 as getUUID } from 'uuid';
import db from './db';
import { getConfig } from './config';
import { logToServer } from './report';

async function saveLog(type, data = {}) {
  let result;

  const { debug, reportThreshold } = getConfig();
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
    const count = await db.logs.count();
    const immediateReport = count > reportThreshold;
    await logToServer(immediateReport);

    result = await db.logs.add(logData);

    if (debug) {
      console.log('Log saved:', logData);
    }
  } catch (e) {
    console.error(`Save failed: ${e}`);
  }

  return result;
}

const savePerformanceLog = async (data = {}) =>
  await saveLog('performance', data);

const saveErrorLog = async (data = {}) => await saveLog('error', data);

const saveBehaviorLog = async (data = {}) => await saveLog('behavior', data);

export { savePerformanceLog, saveErrorLog, saveBehaviorLog };
