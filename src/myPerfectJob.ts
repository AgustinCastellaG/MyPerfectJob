import dataSaver from './helpers/dataSaver';
import compuTrabajoScraper from './scrapers/compuTrabajoScraper';
import { GenericScraper } from './scrapers/genericScraper';

(async () => {
  let data;
  const sources: GenericScraper[] = [];
  sources.push(new compuTrabajoScraper);
  // tslint:disable-next-line: forin
  for (const key in sources) {
    data = await sources[key].getData();
    await dataSaver.saveData(data);
  }
})();
