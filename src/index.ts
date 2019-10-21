import app from './app';
import * as config from './config/config.js';
import { sequelize } from './config/db';

const PORT = config.PORT;

(async () => {
  await sequelize.sync({ force: false }).then(() => {
    console.log('CONNECTION ESTABLISHED SUCCESSFULLY');
  }).catch(() => {
    console.log('CONNECTION REFUSED');
  });
  app.listen(PORT, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server is listening on ${PORT}`);
  });
})();
