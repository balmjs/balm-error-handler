import { getConfig } from '../config';
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
  const { vue } = getConfig();

  // captureConsoleError();
  captureJsError();
  captureResourceError();
  capturePromiseError();
  captureFetchError();
  vue.app && captureVueError(vue.app);
  new SWCrashService();

  onBFCacheRestore(() => {
    captureErrors();
  });
}

export { captureErrors, captureIframeError };
