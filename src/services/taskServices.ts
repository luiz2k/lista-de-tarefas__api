import taskRepositories from '../repositories/taskRepositories';
import mongoose from 'mongoose';
import { taskSchema } from '../validation/taskValidation';

const getAllTasks = async (userId: string) =>
  await taskRepositories.getAllTasks(userId);

const findTask = async (taskId: string, userId: string) => {
  const task = await taskRepositories.findTaskById(taskId);

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw 'O id da tarefa é inválido';

  if (String(task?.userId) !== userId)
    throw 'Você não tem permissão para alterar esta tarefa';

  return task;
};

const createTask = async (userId: string, task: string) => {
  const result = taskSchema.safeParse({
    task,
  });

  if (!result.success) {
    const formatted = result.error.issues;

    const error = formatted.map((error) => {
      return {
        path: String(error.path),
        message: error.message,
      };
    });

    throw error;
  }

  const date = new Date();

  await taskRepositories.createTask(userId, task, date);
};

const editTask = async (userId: string, taskId: string, newTask: string) => {
  const result = taskSchema.safeParse({
    task: newTask,
  });

  if (!result.success) {
    const formatted = result.error.issues;

    const error = formatted.map((error) => {
      return {
        path: String(error.path),
        message: error.message,
      };
    });

    throw error;
  }

  const task = await taskRepositories.findTaskById(taskId);

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw 'O id da tarefa é inválido';

  if (String(task?.userId) !== userId)
    throw 'Você não tem permissão para editar esta tarefa';

  return await taskRepositories.editTask(taskId, newTask);
};

const changeStatus = async (taskId: string, userId: string) => {
  const task = await taskRepositories.findTaskById(taskId);

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw 'O id da tarefa é inválido';

  if (String(task?.userId) !== userId)
    throw 'Você não tem permissão para alterar o status desta tarefa';

  const newStatus = !task?.status;

  return await taskRepositories.changeStatus(taskId, newStatus);
};

const deleteTask = async (taskId: string, userId: string) => {
  const task = await taskRepositories.findTaskById(taskId);

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw 'O id da tarefa é inválido';

  if (String(task?.userId) !== userId)
    throw 'Você não tem permissão para deletar esta tarefa';

  return await taskRepositories.deleteTask(taskId);
};

export default {
  getAllTasks,
  findTask,
  createTask,
  editTask,
  changeStatus,
  deleteTask,
};
