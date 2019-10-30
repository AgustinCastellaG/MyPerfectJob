import { sequelize } from '../config/db';
import jobModel from '../db/models/job.model';

export default class DataSaver {

  public static async saveData(data: jobModel[]) {
    for (const item of data) {
      try {
        let jobData: jobModel = item;
        let job: jobModel = await jobModel.findOne({
          where: {
            empresa: jobData.empresa,
            titulo: jobData.titulo
          }
        });
        if (!job) {
          await jobModel.create(jobData);
        } else {
          console.log('The job ' + jobData.titulo +  ' from ' + jobData.empresa + ' already exists in database.' )
        }
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    }
  }
}
