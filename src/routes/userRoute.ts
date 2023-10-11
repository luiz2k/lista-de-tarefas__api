import { Router } from 'express';
import userControllers from '../controllers/userControllers';

const userRouter = Router();

userRouter.get('/', userControllers.getUserById);
userRouter.delete('/deleteaccount', userControllers.deleteAccount);

userRouter.post('/signout', userControllers.signOut);
userRouter.patch('/changeUsername', userControllers.changeUsername);
userRouter.patch('/changeEmail', userControllers.changeEmail);
userRouter.patch('/changePassword', userControllers.changePassword);

export default userRouter;
