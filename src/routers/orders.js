import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import { ordersController } from '../controllers/orders.js';

const ordersRouter = Router();

ordersRouter.get('/', checkRole, ctrlWrapper(ordersController));

export default ordersRouter;
