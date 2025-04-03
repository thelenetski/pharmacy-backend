import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import { customerController } from '../controllers/customers.js';

const customersRouter = Router();

customersRouter.get('/', checkRole, ctrlWrapper(customerController));
customersRouter.get('/:customerId', checkRole, ctrlWrapper(customerController));

export default customersRouter;
