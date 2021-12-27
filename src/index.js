import common from './common';
import resource from './resource';
import promise from './promise';
import http from './http';
import iframe from './iframe';
import vue from './vue';

function initBalmErrorTracking() {
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

function captureVueError(app) {
  vue(app);
}

export default initBalmErrorTracking;
export { captureHttpError, captureIframeError, captureVueError };
