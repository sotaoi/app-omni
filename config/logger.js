const { Config } = require('@sotaoi/config');

module.exports = {
  log_path: Config.get('LOG_PATH') || './logs',
};
