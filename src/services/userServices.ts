import bcrypt from 'bcrypt';

import userRepositories from '../repositories/userRepositories';
import tokenRepositories from '../repositories/tokenRepositories';
import {
  newEmailSchema,
  newPasswordSchema,
  newUsernameSchema,
} from '../validation/updateProfileValidation';

const getUserById = async (userId: string) => {
  const user = await userRepositories.getUserById(userId);

  return user;
};

const deleteAccount = async (
  userId: string,
  password: string,
  refreshToken: string,
) => {
  const user = await userRepositories.getUserPassword(userId);

  if (!user) throw 'Usuário não encontrado';

  const findRefreshToken =
    await tokenRepositories.findRefreshToken(refreshToken);

  if (!password) throw 'Senha incorreta';

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw 'Senha incorreta';

  if (findRefreshToken) {
    await tokenRepositories.addRevokedToken(refreshToken, userId);
    await tokenRepositories.removeRefreshToken(refreshToken);
  }

  await userRepositories.deleteAllTasks(String(user?._id));
  await userRepositories.deleteAccount(userId, user.password);
};

const signOut = async (refreshToken: string, userId: string) => {
  const findRefreshToken =
    await tokenRepositories.findRefreshToken(refreshToken);

  if (findRefreshToken) {
    await tokenRepositories.addRevokedToken(refreshToken, userId);
    await tokenRepositories.removeRefreshToken(refreshToken);
  }
};

const changeUsername = async (userId: string, newUsername: string) => {
  const result = newUsernameSchema.safeParse({
    newUsername,
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

  await userRepositories.findByIdAndUpdate(userId, { username: newUsername });
};

const changeEmail = async (
  userId: string,
  currentEmail: string,
  newEmail: string,
) => {
  const result = newEmailSchema.safeParse({
    currentEmail,
    newEmail,
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

  const findUserById = await userRepositories.findById(userId);
  const findUserByEmail = await userRepositories.findByEmail(newEmail);

  if (findUserById?.email !== currentEmail)
    throw 'Por favor, informe seu e-mail atual corretamente';

  if (findUserByEmail?.email === newEmail) throw 'E-mail já cadastrado';

  await userRepositories.findByIdAndUpdate(userId, { email: newEmail });
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const result = newPasswordSchema.safeParse({
    currentPassword,
    newPassword,
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

  const user = await userRepositories.findById(userId);
  const password = await userRepositories.findByEmail(user?.email as string);

  const isValidPassword = await bcrypt.compare(
    currentPassword as string,
    password?.password as string,
  );

  if (!isValidPassword) throw 'Senha atual inválida';

  const newPasswordHash = await bcrypt.hash(newPassword as string, 10);

  await userRepositories.findByIdAndUpdate(userId, {
    password: newPasswordHash,
  });
};

export default {
  getUserById,
  deleteAccount,
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
};
