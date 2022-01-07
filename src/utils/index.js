export function onBFCacheRestore(callback) {
  window.addEventListener(
    'pageshow',
    (event) => {
      if (event.persisted) {
        callback(event);
      }
    },
    true
  );
}

export function onBeforeunload(callback) {
  window.addEventListener('beforeunload', callback, true);
}

export function onHidden(callback, once) {
  const onHiddenOrPageHide = (event) => {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      callback(event);
      if (once) {
        window.removeEventListener(
          'visibilitychange',
          onHiddenOrPageHide,
          true
        );
        window.removeEventListener('pagehide', onHiddenOrPageHide, true);
      }
    }
  };

  window.addEventListener('visibilitychange', onHiddenOrPageHide, true);
  window.addEventListener('pagehide', onHiddenOrPageHide, true);
}

export function executeAfterLoad(callback) {
  if (document.readyState === 'complete') {
    callback();
  } else {
    const onLoad = () => {
      callback();
      window.removeEventListener('load', onLoad, true);
    };

    window.addEventListener('load', onLoad, true);
  }
}

export function toPercent(val) {
  return val >= 1 ? '100%' : (val * 100).toFixed(2) + '%';
}

export function getPageHeight() {
  return document.documentElement.scrollHeight || document.body.scrollHeight;
}

export function getScrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

export function getPaths(path) {
  return path.map((item) => item.tagName).filter(Boolean);
}
