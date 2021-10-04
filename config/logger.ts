import { Config } from '@sotaoi/config';

export = {
  log_path: Config.get('LOG_PATH') || './logs',
};
