import z from 'zod';

export const newUsernameSchema = z.object({
  newUsername: z
    .string()
    .min(1, 'O nome deve ter pelo menos 1 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
});

export const newPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export const newEmailSchema = z.object({
  currentEmail: z.string().email('Email inválido'),
  newEmail: z.string().email('Email inválido'),
});
