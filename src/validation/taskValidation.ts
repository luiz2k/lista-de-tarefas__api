import z from 'zod';

export const taskSchema = z.object({
  task: z
    .string()
    .min(1, 'Por favor, digite uma tarefa')
    .max(20, 'A tarefa deve ter no máximo 20 caracteres'),
});
