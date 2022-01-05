const env = require('./env');
const build = require('./build');

module.exports = (mix) => {
  if (env.buildDocs) {
    //
  } else {
    if (mix.env.isProd) {
      build(mix);
    } else {
      mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts'); // For new fonts updated
    }
  }
};
