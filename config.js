//

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

const init = (setupFn, fs, path, extraVars) => {
  setupFn(configs, fs, path, extraVars);
};

module.exports = { config, init };
