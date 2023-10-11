import { Router } from 'express';
import authController from '../controllers/authControllers';

const authRouter = Router();

authRouter.post('/signin', authController.signIn);
authRouter.post('/signup', authController.signUp);

export default authRouter;
