import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import * as config from '../config/config.js';

export const sequelize = new Sequelize({
  host: config.DB_HOST,
  database: config.DB_NAME,
  dialect: 'postgres',
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  storage: ':memory:',
  // logging: false,
  modelPaths: [path.resolve(__dirname, '..', 'db', 'models')]
});
