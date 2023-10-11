import { Router } from 'express';

import authRouter from './authRoute';
import refreshToken from './refreshToken';
import userAuthentication from '../middlewares/userAuthentication';
import userRouter from './userRoute';
import taskRouter from './taskRoute';

const router = Router();

router.use('/auth', authRouter);
router.use('/refreshToken', refreshToken);

router.use(userAuthentication);

router.use('/user', userRouter);
router.use('/', taskRouter);

export default router;
