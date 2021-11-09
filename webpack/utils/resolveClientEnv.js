const prefix = /^VUE_APP_/;
const isClientEnv = (name) => name.match(prefix) || name === 'NODE_ENV';

module.exports = function resolveClientEnv(raw = false) {
  const env = {};

  Object.entries(process.env).forEach(([key, value]) => {
    if (isClientEnv(key)) {
      env[key] = raw ? value : JSON.stringify(value);
    }
  });

  return {
    'process.env': env,
  };
};
