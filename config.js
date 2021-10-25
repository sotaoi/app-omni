//

const { getAppInfo } = require('@sotaoi/omni/get-app-info');

const configs = {};

const config = (key) => {
  try {
    const keyArray = key.toLowerCase().split('.');
    const file = keyArray.shift();
    if (!file) {
      return null;
    }
    let cfg = configs[file];
    if (!cfg) {
      return null;
    }
    for (const key of keyArray) {
      cfg = cfg[key];
      if (typeof cfg === 'undefined') {
        return null;
      }
    }
    return cfg;
  } catch (err) {
    return null;
  }
};

const env = (envvar) => {
  if (typeof envvar === 'undefined' || envvar === null) {
    return null;
  }
  if (typeof envvar === 'number') {
    envvar = String(envvar);
  }
  if (typeof envvar !== 'string') {
    return null;
  }
  const { Config } = require('@sotaoi/config');
  if (!Config.isInit()) {
    console.warn('Attempting to get an env var from Config, but it is not initialized');
    return null;
  }
  return Config.get(envvar);
};

const init = (setupFn, fs, path, extraVars) => {
  setupFn(configs, fs, path, extraVars);
};

module.exports = { config, init, env };
