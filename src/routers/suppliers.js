import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import {
  addSuppliersController,
  editSuppliersController,
  getSuppliersController,
} from '../controllers/suppliers.js';

const suppliersRouter = Router();

suppliersRouter.get('/', checkRole, ctrlWrapper(getSuppliersController));
suppliersRouter.post('/', checkRole, ctrlWrapper(addSuppliersController));
suppliersRouter.put(
  '/:supplierId',
  checkRole,
  ctrlWrapper(editSuppliersController),
);
export default suppliersRouter;
