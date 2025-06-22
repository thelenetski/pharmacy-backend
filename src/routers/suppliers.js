import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import {
  addSuppliersController,
  deleteSuppliersController,
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
suppliersRouter.delete(
  '/:supplierId',
  checkRole,
  ctrlWrapper(deleteSuppliersController),
);
export default suppliersRouter;
