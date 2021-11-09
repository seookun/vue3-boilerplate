const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const fs = require('fs');
const path = require('path');

const localFiles = ['.env', '.env.local', '.env.development'];

function loadConfig(mode) {
  const files = mode ? [`.env.${mode}`] : localFiles;
  const filePaths = files.map((file) => path.join(__dirname, '../../', file));

  // get existing file path first matched.
  const matchedPath = filePaths.find(fs.existsSync);

  if (matchedPath) {
    return dotenv.config({ path: matchedPath });
  }
}

module.exports = function loadEnv(mode) {
  const config = loadConfig(mode);

  if (config) {
    // override NODE_ENV by value in env file.
    // env has high priority
    process.env.NODE_ENV = config.parsed?.NODE_ENV || mode || 'development';

    dotenvExpand(config);
  }
};
