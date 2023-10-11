import { Request, Response } from 'express';

import userServices from '../services/userServices';

const getUserById = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await userServices.getUserById(userId);

    return res.status(200).send({ username: user?.username });
  } catch (error) {
    return res.status(401).send({ error: error });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { password, refreshToken } = req.body;

  try {
    await userServices.deleteAccount(userId, password, refreshToken);

    return res.status(200).send({ message: 'Conta deletada com sucesso!' });
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};

const signOut = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { refreshToken } = req.body;

  try {
    await userServices.signOut(refreshToken, userId);

    res.status(200).send({ message: 'Logout efetuado com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const changeUsername = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { newUsername } = req.body;

  try {
    await userServices.changeUsername(userId, newUsername);

    res.status(200).send({ message: 'Nome de usuário alterado' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const changeEmail = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentEmail, newEmail } = req.body;

  try {
    await userServices.changeEmail(userId, currentEmail, newEmail);

    res.status(200).send({ message: 'E-mail alterado com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const changePassword = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    await userServices.changePassword(userId, currentPassword, newPassword);

    res.status(200).send({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export default {
  getUserById,
  deleteAccount,
  signOut,
  changeUsername,
  changeEmail,
  changePassword,
};
