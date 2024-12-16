import { Router } from 'express';
import {
  refreshController,
  signinController,
  signoutController,
  signupController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post('/signup', ctrlWrapper(signupController));

authRouter.post('/signin', ctrlWrapper(signinController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/signout', ctrlWrapper(signoutController));

export default authRouter;
