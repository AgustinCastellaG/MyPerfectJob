import { Router } from 'express';
import jobRoute from './job/job.route';

const router: Router = Router();

router.use('/jobs', jobRoute);

export default router;
