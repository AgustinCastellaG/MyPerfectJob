import * as puppeteer from 'puppeteer';
import { GenericScraper } from './genericScraper';
const randomUseragent = require('random-useragent');
import Job from '../db/models/job.model';
require('dotenv').config();

export default class CompuTrabajoScraper implements GenericScraper {
  public async getData() {

    const jobs: Job[] = [];
    let globalUrls: string[] = [];

    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      headless: false,
    });
    const page = await browser.newPage();
    // random user agent
    await page.setUserAgent(randomUseragent.getRandom());

    const url = 'https://www.smarttalent.uy/smart/smartalent/templates/oportunidades.jsp?contentid=2785&site=15&channel=innova.front&nolimite=1';
    await page.goto(url);
    await page.waitFor(2000);

    // a.children[1].children[0].children[1].children[0].getAttribute('href')
    globalUrls = await page.evaluate(() => {
      const tempUrls: string[] = [];
      const table = document.querySelector('.table-hover');
      const tableRows = [...table.children];
      tableRows.forEach(item => {
        if (item.tagName === 'TBODY') {
          tempUrls.push(item.children[0].children[1].children[0].getAttribute('href'));
        }
      });
      return tempUrls;
    });

    await page.waitFor(1000);
    // tslint:disable-next-line: prefer-template
    for (let i = 0; i < globalUrls.length; i += 1) {
      await page.goto(globalUrls[i]);

      await page.waitFor(1000);
      let job: Job;
      job = await page.evaluate(() => {
        const tempJob = {} as Job;

        // titulo
        const mds7 = document.querySelectorAll('.col-md-7');
        tempJob.titulo = (mds7[1] as HTMLElement).innerText;

        // empresa
        const div = document.querySelector('.col-md-8');
        const divArray = [...div.children];
        tempJob.empresa = divArray[1].children[0].textContent.replace(/(\r\n|\n|\r|\s)/gm, '');

        const main = document.querySelector('.col-md-12');
        const mainArray = [...main.children];
        for (let i = 0; i < mainArray.length; i += 1) {
          if (mainArray[i].tagName === 'H4' && mainArray[i].textContent === 'Breve descripción del cargo') {
            tempJob.descripcion = mainArray[i + 1].textContent;
          }
          if (mainArray[i].tagName === 'H4' && mainArray[i].textContent === 'Habilidades requeridas') {
            tempJob.requerimientos = mainArray[i + 1].textContent;
          }
          if (mainArray[i].tagName === 'H4' && mainArray[i].textContent === 'Carga horaria') {
            tempJob.jornada = mainArray[i + 1].textContent;
          }
        }
        tempJob.salario = 'A Convenir';
        tempJob.contrato = 'Contrato por tiempo indefinido';
        tempJob.scrapedFrom = 'SmartTalent';
        tempJob.localizacion = 'Montevideo,  Montevideo';

        return tempJob;
      });

      jobs.push(job);
    }
    console.log(jobs);
    return jobs;
  }
}
