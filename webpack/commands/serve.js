const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const loadEnv = require('../utils/loadEnv');

(async () => {
  loadEnv(process.env.NODE_ENV);

  const webpackConfig = require('../config/dev');

  const compiler = webpack(webpackConfig);
  const devServerOptions = { ...webpackConfig.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);

  await server.start();
})();
