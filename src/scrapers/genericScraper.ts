import jobModel from '../db/models/job.model';

export interface GenericScraper {
  getData(): Promise<jobModel[]>;
}
