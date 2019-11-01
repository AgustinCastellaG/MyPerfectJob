import { Router } from 'express';
import jobController from './job.controller';

const user: Router = Router();
const controller = new jobController();

// Fetch
user.post('/', controller.fetch);

// Get all
user.get('/', controller.get);

export default user;
