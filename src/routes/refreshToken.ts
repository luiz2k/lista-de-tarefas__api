import { Router } from 'express';
import refreshTokenControllers from '../controllers/refreshTokenControllers';

const refreshTokenRouter = Router();

refreshTokenRouter.post('/', refreshTokenControllers.refresh);

export default refreshTokenRouter;
