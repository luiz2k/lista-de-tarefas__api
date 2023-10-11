import { Request, Response, NextFunction } from 'express';

import userRepositories from '../repositories/authRepositories';
import tokenRepositories from '../repositories/tokenRepositories';

import jwt from 'jsonwebtoken';

const userAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).send({ error: 'Token inválido' });

  const authorizationSchema = authorization?.split(' ');

  const [bearer, token] = authorizationSchema;

  const regex = /^(?!Bearer$).*$/;

  if (regex.test(bearer))
    return res.status(401).send({ error: 'Token inválido' });

  const refreshToken = await tokenRepositories.findRefreshToken(token);

  if (refreshToken) return res.status(401).send({ error: 'Token inválido' });

  jwt.verify(
    token,
    process.env.ACCESS_SECRET_JWT as string,
    async (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token inválido' });

      const userId: string = (decoded as jwt.JwtPayload).id;

      const user = await userRepositories.findById(userId);

      if (!user) return res.status(401).send({ error: 'Token inválido' });

      req.userId = userId;

      return next();
    },
  );
};

export default userAuthentication;
