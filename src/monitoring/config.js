const defaultOptions = {
  debug: false,
  printErrors: false,
  reportRate: 1,
  reportEndpoint: '/log',
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
