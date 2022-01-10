import { getConfig } from '../monitoring';
// import captureConsoleError from './console';
import captureJsError from './common';
import captureResourceError from './resource';
import capturePromiseError from './promise';
import captureFetchError from './fetch';
import captureIframeError from './iframe';
import captureVueError from './vue';
import SWCrashService from './crash';
import { onBFCacheRestore } from '../utils';

function captureErrors() {
  const { printErrors, vue } = getConfig();

  // captureConsoleError();
  captureJsError();
  captureResourceError();
  capturePromiseError(printErrors);
  captureFetchError();
  vue.app && captureVueError(vue.app);
  new SWCrashService();

  onBFCacheRestore(() => {
    captureErrors();
  });
}

export { captureErrors, captureIframeError };
