import { Config } from '@sotaoi/config';

export = {
  connection: {
    host: Config.get('DB_HOST'),
    user: Config.get('DB_USERNAME'),
    password: Config.get('DB_PASSWORD'),
    database: Config.get('DB_NAME'),
    control_panel_database: Config.get('DB_CONTROL_PANEL_NAME'),
    mongo_port: Config.get('DB_MONGO_PORT'),
    mysql_port: Config.get('DB_MYSQL_PORT'),
  },
  migrations_path: Config.get('DB_MIGRATIONS_PATH'),
  seeds_path: Config.get('DB_SEEDS_PATH'),
};
