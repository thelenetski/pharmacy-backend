import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkRole } from '../middlewares/checkRole.js';
import { productsController } from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/', checkRole, ctrlWrapper(productsController));

export default productsRouter;
