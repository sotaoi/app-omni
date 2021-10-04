import { Config } from '@sotaoi/config';

export = {
  name: Config.get('APP_NAME'),
  package_name: Config.get('PACKAGE_NAME'),
  bundle_secret: Config.get('APP_BUNDLE_SECRET'),
  oauth_secret: Config.get('APP_OAUTH_SECRET'),
  oauth_port: Config.get('APP_OAUTH_PORT'),
};
