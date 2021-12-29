import config from './config';
import common from './common';
import resource from './resource';
import promise from './promise';
import http from './http';
import iframe from './iframe';
import vue from './vue';
import stuck from './stuck';
import SWCrashService from './crash';
import { saveErrorLog } from './log';

let isTracking = false;

function initBalmTracking() {
  common();
  resource();
  promise();
  http();
  iframe();
  stuck();
  new SWCrashService();
}

function captureIframeError() {
  iframe();
}

function captureVueError(app) {
  vue(app);
}

if (!isTracking) {
  isTracking = true;
  initBalmTracking();
}

export { config, saveErrorLog, captureIframeError, captureVueError };
