module.exports = function (api) {
  let envOptions = api.env('production')
    ? {
        modules: false,
        useBuiltIns: 'usage',
        corejs: { version: '3.19', proposals: true }
      }
    : {};
  let runtimeOptions = api.env('production') ? { corejs: 3 } : {};

  return {
    presets: [['@babel/preset-env', envOptions]],
    plugins: [
      ['@babel/plugin-transform-runtime', runtimeOptions],
      [
        'prismjs',
        {
          languages: [
            'markup',
            'css',
            'javascript',
            'bash',
            'scss',
            'typescript'
          ],
          plugins: ['highlight-keywords', 'toolbar', 'copy-to-clipboard']
        }
      ]
    ]
  };
};
