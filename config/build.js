const pkg = require('../package.json');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');

const banner =
  '/*!\n' +
  ` * BalmUI v${pkg.version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} N.Elf-mousE\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const plugins = [
  nodeResolve(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js'],
    babelHelpers: 'runtime',
    presets: [['@babel/preset-env', { modules: false }]]
  }),
  commonjs()
];

const inputOptions = {
  input: `./src/index.js`,
  plugins
};
const outputOptions = {
  file: './dist/balm-tracking.js',
  format: 'umd',
  name: 'BalmTracking',
  banner,
  exports: 'named'
};

function build(mix) {
  mix.remove('dist');

  mix.rollup(inputOptions, outputOptions);
  mix.copy('src/clash-sw.js', 'dist');
}

module.exports = build;
