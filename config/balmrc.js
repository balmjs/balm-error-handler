const env = require('./env');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const serve = require('./server');

const workspace = path.join(__dirname, '..');

function resolve(dir) {
  return path.join(workspace, dir);
}

function getConfig(balm) {
  const useBuild = balm.config.env.isProd && !env.buildDocs;

  return {
    useDefaults: !useBuild,
    server: {
      next() {
        if (balm.config.env.isDev) {
          serve();
        }
      }
    },
    roots: {
      source: 'docs'
    },
    styles: {
      extname: 'scss'
    },
    scripts: {
      // lint: true,
      entry: {
        app: './docs/scripts/index.js'
      },
      loaders: [
        {
          test: /\.md$/,
          use: ['html-loader', 'markdown-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ],
      urlLoaderOptions: {
        esModule: false
      },
      alias: {
        '@': resolve('docs/scripts'),
        vue$: 'vue/dist/vue.esm-bundler.js',
        'balm-tracking': resolve('src/index.js'),
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js'
      },
      plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: JSON.stringify(true),
          __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
        })
      ]
    },
    assets: {
      cache: env.buildDocs
    }
  };
}

module.exports = getConfig;
