import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  userInfoController,
  refreshUserSessionController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/user-info', ctrlWrapper(userInfoController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;
