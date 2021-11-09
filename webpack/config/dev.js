const { merge } = require('webpack-merge');

const baseConfig = require('./base');
const cssConfig = require('./css');

module.exports = merge(baseConfig, cssConfig, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    devMiddleware: {
      publicPath: '/',
    },
    open: false,
    host: '0.0.0.0',
    port: 8080,
    liveReload: false,
  },

  infrastructureLogging: {
    level: 'warn',
  },
});
