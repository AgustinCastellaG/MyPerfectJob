import app from './app';
import { sequelize } from './config/db';
import myPerfectJob from './myPerfectJob';

const PORT = 3000;

(async () => {
  await sequelize.sync({ force: false }).then(() => {
    console.log('CONNECTION ESTABLISHED SUCCESSFULLY');
  }).catch(() => {
    console.log('CONNECTION REFUSED');
  });

  myPerfectJob;
  app.listen(PORT, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server is listening on port ${PORT}`);
  });
})();
