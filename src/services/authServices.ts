import authRepositories from '../repositories/authRepositories';
import tokenRepositories from '../repositories/tokenRepositories';

import { authSignUpSchema } from '../validation/authValidation';

import bcrypt from 'bcrypt';

import jwb from 'jsonwebtoken';

const signIn = async (email: string, password: string) => {
  const user = await authRepositories.findByEmail(email);

  if (!user) throw 'E-mail ou senha inválido';

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw 'E-mail ou senha inválido';

  const token = jwb.sign(
    { id: user._id },
    process.env.ACCESS_SECRET_JWT as string,
    {
      expiresIn: '1h',
    },
  );

  const refreshToken = jwb.sign(
    { id: user._id },
    process.env.REFRESH_SECRET_JWT as string,
    {
      expiresIn: '7d',
    },
  );

  await tokenRepositories.addRefreshToken(String(user._id), refreshToken);

  return {
    message: 'Login efetuado com sucesso',
    token,
    refreshToken,
  };
};

const signUp = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const result = authSignUpSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    const formatted = result.error.issues;

    const errors = formatted.map((error) => {
      return {
        path: String(error.path),
        message: error.message,
      };
    });

    throw errors;
  }

  const findByEmail = await authRepositories.findByEmail(email);

  if (findByEmail) throw 'E-mail já cadastrado';

  const createAccount = await authRepositories.signUp(
    username,
    email,
    password,
  );

  const token = jwb.sign(
    { id: createAccount._id },
    process.env.ACCESS_SECRET_JWT as string,
    {
      expiresIn: '1h',
    },
  );

  const refreshToken = jwb.sign(
    { id: createAccount._id },
    process.env.REFRESH_SECRET_JWT as string,
    {
      expiresIn: '7d',
    },
  );

  await tokenRepositories.addRefreshToken(
    String(createAccount._id),
    refreshToken,
  );

  return {
    message: 'Conta criada com sucesso',
    token,
    refreshToken,
  };
};

export default {
  signUp,
  signIn,
};
