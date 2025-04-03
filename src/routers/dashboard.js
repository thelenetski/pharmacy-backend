import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { dashboardController } from '../controllers/dashboard.js';
import { checkRole } from '../middlewares/checkRole.js';

const dashboardRouter = Router();

dashboardRouter.get('/', checkRole, ctrlWrapper(dashboardController));

export default dashboardRouter;
