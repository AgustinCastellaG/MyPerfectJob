import dataSaver from './helpers/dataSaver';
import compuTrabajoScraper from './scrapers/compuTrabajoScraper';
import { GenericScraper } from './scrapers/genericScraper';
import Job from './db/models/job.model';

const scraper = (async () => {
  // const job = {
  //   empresa: 'December',
  //   titulo: '',
  //   contrato: '',
  //   jornada: '',
  //   salario:'',
  //   descripcion: '',
  //   scrapedFrom: ''
  // } as Job;
  // data.push(job);
  let data: Job[];
  const sources: GenericScraper[] = [];
  sources.push(new compuTrabajoScraper);
  // tslint:disable-next-line: forin
  for (const key in sources) {
    data = await sources[key].getData();
    await dataSaver.saveData(data);
  }
})();

export default scraper;
