import { Router } from 'express';
import { signinController, signupController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post('/signup', ctrlWrapper(signupController));

authRouter.post('/signin', ctrlWrapper(signinController));

export default authRouter;
