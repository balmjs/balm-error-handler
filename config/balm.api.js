const env = require('./env');

module.exports = (mix) => {
  if (env.buildDocs) {
    //
  } else {
    if (mix.env.isProd) {
      //
    } else {
      mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts'); // For new fonts updated
    }
  }
};
