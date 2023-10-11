import jwt from 'jsonwebtoken';
import tokenRepositories from '../repositories/tokenRepositories';

const refresh = async (refreshToken: string) => {
  const findRevokedToken =
    await tokenRepositories.findRevokedToken(refreshToken);

  if (findRevokedToken) throw 'O Token está na lista de revogados';

  const findRefreshToken =
    await tokenRepositories.findRefreshToken(refreshToken);

  if (!findRefreshToken) throw 'Refresh token inválido';

  if (findRefreshToken) {
    await tokenRepositories.addRevokedToken(
      refreshToken,
      String(findRefreshToken.userId),
    );

    await tokenRepositories.removeRefreshToken(refreshToken);
  }

  const token = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_JWT as string,
    (err, decoded) => {
      if (err) throw 'Refresh token inválido';

      const userId: string = (decoded as jwt.JwtPayload).id;

      const newToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_SECRET_JWT as string,
        {
          expiresIn: '1h',
        },
      );

      const newRefreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_SECRET_JWT as string,
        {
          expiresIn: '7d',
        },
      );

      tokenRepositories.addRefreshToken(String(userId), newRefreshToken);

      return {
        message: 'Novo token de acesso gerado',
        token: newToken,
        refreshToken: newRefreshToken,
      };
    },
  );

  return token;
};

export default { refresh };
