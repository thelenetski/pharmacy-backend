import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import {
  customerIdController,
  customersAllController,
} from '../controllers/customers.js';

const customersRouter = Router();

customersRouter.get('/', checkRole, ctrlWrapper(customersAllController));
customersRouter.get(
  '/:customerId',
  checkRole,
  ctrlWrapper(customerIdController),
);

export default customersRouter;
