//

const setup = (configs, fs, path, extraVars) => {
  try {
    const Config = require('@sotaoi/config').Config;
    Config.init(require('@app/omni/env.json'));
    for (const [key, val] of Object.entries(Config.dumpEnvVars())) {
      if (val === null || typeof val === 'undefined' || typeof val === 'boolean') {
        continue;
      }
      if (typeof val === 'number' || typeof val === 'string') {
        process.env[key] = val.toString();
        continue;
      }
      process.env[key] = JSON.stringify(val);
    }
    for (const [key, val] of Object.entries(extraVars)) {
      process.env[key] = typeof val === 'string' ? val : undefined;
    }
    const fs = require('fs');
    const path = require('path');
    const configPath = path.resolve(path.dirname(require.resolve('@app/omni/package.json')), 'config');
    fs.readdirSync(configPath).map((configFile) => {
      const extname = path.extname(configFile);
      const basename = path.basename(configFile, extname);
      const config = require(path.resolve(configPath, extname !== 'json' ? basename : configFile));
      configs[basename] = config;
    });
  } catch (err) {
    // do nothing
  }
};

module.exports = { setup };
