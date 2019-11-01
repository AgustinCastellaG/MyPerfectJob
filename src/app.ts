import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import apiV1 from './apiV1';
import * as config from './config/config.js';
import * as errorHandler from './helpers/errorHandler';

class App {
  public express: express.Application;
  private corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: [
      'Save-Data',
      'Content-Type',
      'Authorization',
      'Content-Length',
      'X-Requested-With',
      'Accept',
    ]
  };

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.express.use('/v1', apiV1);
  }

  private setMiddlewares(): void {
    this.express.use(cors(this.corsOptions));
    this.express.use(cookieParser());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

}

export default new App().express;
