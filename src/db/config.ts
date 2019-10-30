import config from "../config/config";

const devConfig = {
  host: config.DB_HOST,
  database: config.DB_NAME,
  dialect: 'postgres',
  username: config.DB_USER,
  password: config.DB_PASSWORD
};

module.exports = {
  development: devConfig
};

