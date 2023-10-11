import z from 'zod';

export const authSignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, 'O nome deve ter pelo menos 1 caracteres')
      .max(50, 'O nome deve ter no máximo 50 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .transform((fields) => ({
    username: fields.username,
    email: fields.email.toLowerCase(),
    password: fields.password,
    confirmPassword: fields.confirmPassword,
  }));
