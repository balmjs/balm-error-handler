const defaultOptions = {
  debug: false,
  printErrors: false,
  reportEndpoint: '/log',
  reportRate: 1,
  reportThreshold: 1024,
  vue: {
    app: undefined,
    router: undefined
  }
};

let options = {};

function setConfig(newOptions = {}) {
  options = Object.assign(defaultOptions, newOptions);
}

function getConfig() {
  return options;
}

export { getConfig, setConfig };
