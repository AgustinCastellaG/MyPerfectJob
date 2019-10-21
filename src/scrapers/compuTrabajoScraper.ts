import * as puppeteer from 'puppeteer';
import { GenericScraper } from './genericScraper';
let randomUseragent = require('random-useragent');
import jobModel from '../db/models/job.model';
require('dotenv').config();

export default class angelListScraper implements GenericScraper {
  public async getData() {
    const jobs : jobModel[] = [];
    return jobs;
  }
}
