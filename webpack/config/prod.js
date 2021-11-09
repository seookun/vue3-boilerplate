const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./base');
const cssConfig = require('./css');
const terserOptions = require('./terserOptions');

module.exports = merge(baseConfig, cssConfig, {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions)],
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
      },
    },
  },
});
