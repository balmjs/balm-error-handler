import common from './common';
import resource from './resource';
import promise from './promise';
import http from './http';
import iframe from './iframe';

function initScriptErrorHandler(options = {}) {
  common();
  resource();
  promise();
}

function captureHttpError(fn) {
  http(fn);
}

function captureIframeError() {
  iframe();
}

export default initScriptErrorHandler;
export { captureHttpError, captureIframeError };
