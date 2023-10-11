import { Request, Response } from 'express';

import authServices from '../services/authServices';

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await authServices.signIn(email, password);

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const signUp = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const token = await authServices.signUp(
      username,
      email,
      password,
      confirmPassword,
    );

    res.status(201).send(token);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export default {
  signIn,
  signUp,
};
