import { setConfig, saveErrorLog, report } from './monitoring';
import captureBehaviors from './behavior';
import { captureErrors, captureIframeError } from './error';
import capturePerformances from './performance';

function balmTracking(options = {}) {
  setConfig(options);

  captureBehaviors();
  captureErrors();
  capturePerformances();

  report();
}

export default balmTracking;
export { saveErrorLog, captureIframeError };
