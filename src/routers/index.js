import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();

router.use('/api/user', authRouter);
// router.use('/api/dashboard', dashboardRouter);
// router.use('/api/customers', customersRouter);
// router.use('/api/orders', ordersRouter);
// router.use('/api/products', productsRouter);
// router.use('/api/suppliers', suppliersRouter);

export default router;
