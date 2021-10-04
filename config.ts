//

const configs: { [key: string]: any } = {};

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
  const fs = require('fs');
  const path = require('path');
  const configPath = path.resolve(path.dirname(require.resolve('@app/omni/package.json')), 'config');
  fs.readdirSync(configPath).map((configFile: string) => {
    const extname = path.extname(configFile);
    const basename = path.basename(configFile, extname);
    const config = require(path.resolve(configPath, extname !== 'json' ? basename : configFile));
    configs[basename] = config;
  });
} catch (err) {
  // do nothing
}

const config = (key: string): any => {
  try {
    const keyArray = key.toLowerCase().split('.');
    const file: string | undefined = keyArray.shift();
    if (!file) {
      return null;
    }
    let cfg: any = configs[file];
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

export { config };
