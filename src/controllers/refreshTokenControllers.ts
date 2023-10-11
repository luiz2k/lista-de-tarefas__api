import { Request, Response } from 'express';

import refreshTokenServices from '../services/refreshTokenServices';

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const newTokens = await refreshTokenServices.refresh(refreshToken);

    return res.status(200).send(newTokens);
  } catch (error) {
    return res.status(401).send({ erros: error });
  }
};

export default { refresh };
