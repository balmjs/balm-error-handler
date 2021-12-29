import { setConfig } from './config';
import { saveErrorLog } from './log';
import {
  captureScriptErrors,
  captureIframeError,
  captureVueError
} from './capture';
import reportScriptErrors from './report';

function initBalmTracking(options = {}) {
  setConfig(options);

  captureScriptErrors();
  reportScriptErrors();
}

export default initBalmTracking;
export { saveErrorLog, captureIframeError, captureVueError };
