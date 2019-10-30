import { sequelize } from '../config/db';
import Job from "../db/models/job.model";

export default class DataSaver {

  public static async saveData(data: Job[]) {
    for (const item of data) {
      try {
        const jobData = item;
        const job = await Job.findOne({
          where: {
            empresa: jobData.empresa,
            titulo: jobData.titulo
          }
        });
        if (!job) {
          await Job.create(jobData);
        } else {
          console.log('The job ' + jobData.titulo +  ' from ' + jobData.empresa + ' already exists in database.');
        }
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    }
  }
}
