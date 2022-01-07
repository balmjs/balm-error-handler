import captureJsError from './common';

function captureIframeError() {
  if (window.frames[0]) {
    captureJsError('iframe');
  }
}

export default captureIframeError;
