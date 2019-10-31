import * as puppeteer from 'puppeteer';
import { GenericScraper } from './genericScraper';
const randomUseragent = require('random-useragent');
import Job from '../db/models/job.model';
require('dotenv').config();

export default class CompuTrabajoScraper implements GenericScraper {
  public async getData() {
    const jobs: Job[] = [];
    let globalUrls: string[] = [];

    const compuTrabajoUser = process.env.COMPUTRABAJOUSER;
    const compuTrabajoPassword = process.env.COMPUTRABAJOPASSWORD;

    const loginButton = '#logintoggle > span';
    const emailInput = '#txEmail';
    const passwordInput = '#txPwd';
    const sendButton = '#btnLogin';

    const filterButton = '#sq';
    const buscarEmpleoButton = '#search';

    // tslint:disable-next-line: max-line-length
    // const informaticaUrl = 'https://www.computrabajo.com.uy/ofertas-de-trabajo/?q=Inform%C3%A1tica';

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

    const url = 'https://www.computrabajo.com.uy/';
    await page.goto(url);
    await page.waitFor(2000);

    await page.click(loginButton);

    // write user
    await page.waitFor(2000);
    await page.click(emailInput);
    await page.keyboard.type(compuTrabajoUser, { delay: 50 });

    // write password
    await page.waitFor(2000);
    await page.click(passwordInput);
    await page.keyboard.type(compuTrabajoPassword, { delay: 50 });

    await page.waitFor(1000);
    await page.click(sendButton);

    await page.waitFor(2000);
    await page.click(filterButton);
    await page.keyboard.type('informatica', { delay: 50 });
    await page.waitFor(1000);
    await page.click(buscarEmpleoButton);

    // get jobs urls
    for (let j = 1; j < 11; j += 1) {
      await page.goto('https://www.computrabajo.com.uy/ofertas-de-trabajo/?p=' + j + '&q=informatica');
      await page.waitFor(5000);
      let localUrls: string[] = [];
      localUrls = await page.evaluate(() => {
        const tempUrls: string[] = [];
        const partialUrls = document.querySelectorAll('.js-o-link');
        partialUrls.forEach((elem) => {
          tempUrls.push(elem.getAttribute('href'));
        });
        console.log(tempUrls);
        return tempUrls;
      });
      globalUrls = globalUrls.concat(localUrls);
    }
    console.log('urls: ' + globalUrls);

    await page.waitFor(1000);
    // tslint:disable-next-line: prefer-template
    for (let i = 0; i < globalUrls.length; i += 1) {
      await page.goto('https://www.computrabajo.com.uy' + globalUrls[i]);

      await page.waitFor(1000);
      let job: Job;
      job = await page.evaluate(() => {
        const tempJob = {} as Job;

        // titulo
        const headerBox = document.querySelector('.box_image');
        tempJob.titulo = (headerBox.children[0].children[0] as HTMLElement).innerText;

        // datos del resumen
        const ulResumen = document.querySelector('.box_r').children[1];
        const array = [...ulResumen.children];
        array.forEach((elem) => {
          switch (elem.children[0].textContent) {
            case 'Empresa': {
              tempJob.empresa = (elem.children[2] as HTMLElement).innerText;
              break;
            }
            case 'Localización': {
              tempJob.localizacion = (elem.children[1] as HTMLElement).innerText;
              break;
            }
            case 'Jornada': {
              tempJob.jornada = (elem.children[1] as HTMLElement).innerText;
              break;
            }
            case 'Tipo de contrato': {
              tempJob.contrato = (elem.children[1] as HTMLElement).innerText;
              break;
            }
            case 'Salario': {
              tempJob.salario = (elem.children[1] as HTMLElement).innerText;
              break;
            }
            default: {
              // do nothing
            }
          }
        });
        if (!tempJob.empresa) {
          tempJob.empresa = 'Importante empresa del sector';
        }

        // descripcion
        const descriptionUl = document.querySelector('.bWord');
        const rawDescription = (descriptionUl.children[0].children[0] as HTMLElement).innerText;
        tempJob.descripcion = rawDescription.replace('Descripción\n', '').replace(/[^a-zA-Z0-9-_–$%',.:;()áéíóúÁÉÍÓÚñÑ\n!¡/ ]/gm, '');

        // requerimientos
        const requerimientosCollection = descriptionUl.children[0].children;
        const requerimientosArray = [...requerimientosCollection];
        let isReq: boolean = false;
        let reqString: string = '';
        for (const item of requerimientosArray) {
          if (item.tagName === 'H3') {
            isReq = true;
          }
          if (item.tagName === 'LI' && isReq) {
            const requerimiento = (item as HTMLElement).innerText;
            if (requerimiento.includes('Años de experiencia')) {
              tempJob.experiencia = requerimiento.replace(/[^0-9]/gm, '');
            }
            reqString += (`${requerimiento}\n`);
          }
        }
        if (!tempJob.experiencia) {
          tempJob.experiencia = '0';
        }
        tempJob.requerimientos = reqString;
        tempJob.scrapedFrom = 'CompuTrabajo';
        return tempJob;
      });
      jobs.push(job);
    }

    console.log(jobs);
    return jobs;
  }
}

// ul = document.querySelector('.box_r').children[1]
// array = [...ul.children]

// if (array[2].children[1].tagName === 'P') {
//   console.log('esa')
// }
