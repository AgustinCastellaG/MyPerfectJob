import Job from '../db/models/job.model';

export interface GenericScraper {
  getData(): Promise<Job[]>;
}
