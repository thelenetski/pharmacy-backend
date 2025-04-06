import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import {
  getProductsController,
  addProductsController,
  editProductsController,
  deleteProductsController,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', checkRole, ctrlWrapper(getProductsController));
productsRouter.post('/', checkRole, ctrlWrapper(addProductsController));
productsRouter.put(
  '/:productId',
  checkRole,
  ctrlWrapper(editProductsController),
);
productsRouter.delete(
  '/:productId',
  checkRole,
  ctrlWrapper(deleteProductsController),
);

export default productsRouter;
