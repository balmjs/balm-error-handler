import common from './common';

function iframe() {
  if (window.frames[0]) {
    common({ name: 'iframe' }, window.frames[0]);
  }
}

export default iframe;
