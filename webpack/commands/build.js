const webpack = require('webpack');
const rimraf = require('rimraf');

const resolveLocal = require('../utils/resolveLocal');
const loadEnv = require('../utils/loadEnv');

(async () => {
  await rimraf.sync(resolveLocal('dist'));

  loadEnv(process.env.NODE_ENV || 'production');

  const webpackConfig = require('../config/prod');

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err;

    if (stats.hasErrors()) {
      throw new Error('Build failed with errors.');
    }
  });
})();
