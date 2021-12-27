import common from './common';

function iframe() {
  if (window.frames[0]) {
    common('iframe');
  }
}

export default iframe;
