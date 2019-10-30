const dotEnv = require('dotenv');
dotEnv.config();

const conf = {
  APP: process.env.APP,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,

  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_RPASSWORD_EXPIRATION: process.env.JWT_RPASSWORD_EXPIRATION,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  COOKIE_SECURITY: process.env.COOKIE_SECURITY,
  COOKIE_EXPIRATION: process.env.COOKIE_EXPIRATION,
};

export default conf;
