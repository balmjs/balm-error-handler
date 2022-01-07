import { setConfig } from './config';
import { saveErrorLog } from './monitoring/logger';
import captureBehaviors from './behavior';
import { captureErrors, captureIframeError } from './error';
import capturePerformances from './performance';
import report from './monitoring/report';

function balmTracking(options = {}) {
  setConfig(options);

  captureBehaviors();
  captureErrors();
  capturePerformances();

  report();
}

export default balmTracking;
export { saveErrorLog, captureIframeError };
