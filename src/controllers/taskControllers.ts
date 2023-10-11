import { Request, Response } from 'express';
import taskServices from '../services/taskServices';

const getAllTasks = async (req: Request, res: Response) => {
  const id = req.userId;

  try {
    const tasks = await taskServices.getAllTasks(id);

    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({ erros: error });
  }
};

const findTask = async (req: Request, res: Response) => {
  const userId = req.userId;
  const taskId = req.params.id;

  try {
    const task = await taskServices.findTask(taskId, userId);

    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const createTask = async (req: Request, res: Response) => {
  const task = req.body.task;
  const userId = req.userId;

  try {
    await taskServices.createTask(userId, task);

    res.status(201).send({ message: 'Tarefa criada com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const editTask = async (req: Request, res: Response) => {
  const userId = req.userId;
  const taskId = req.params.id;
  const newTask = req.body.task;

  try {
    await taskServices.editTask(userId, taskId, newTask);

    res.status(200).send({ message: 'Tarefa editada com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const userId = req.userId;

  try {
    await taskServices.changeStatus(taskId, userId);

    res.status(200).send({ message: 'Status alterado com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const userId = req.userId;

  try {
    await taskServices.deleteTask(taskId, userId);

    res.status(200).send({ message: 'Tarefa deletada com sucesso!' });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export default {
  getAllTasks,
  findTask,
  createTask,
  editTask,
  changeStatus,
  deleteTask,
};
