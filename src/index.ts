import app from './app';
import { sequelize } from './config/db';

const PORT = 3000;

(async () => {
  await sequelize.sync({ force: true }).then(() => {
    console.log('CONNECTION ESTABLISHED SUCCESSFULLY');
  }).catch(() => {
    console.log('CONNECTION REFUSED');
  });

  app.listen(PORT, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server is listening on port ${PORT}`);
  });
})();
