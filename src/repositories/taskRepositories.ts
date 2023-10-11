import Task from '../models/tasks';

const getAllTasks = (userId: string) => Task.find({ userId });

const createTask = (userId: string, task: string, createdAt: Date) =>
  Task.create({ userId, task, createdAt });

const editTask = (id: string, newTask: string) =>
  Task.findByIdAndUpdate({ _id: id }, { $set: { task: newTask } });

// const findById = (id: string) => Task.findById({ userId: id });

const findTaskById = (id: string) => Task.findById({ _id: id });

const changeStatus = (id: string, newStatus: boolean) =>
  Task.findByIdAndUpdate({ _id: id }, { $set: { status: newStatus } });

const deleteTask = (id: string) => Task.findByIdAndDelete({ _id: id });

export default {
  getAllTasks,
  createTask,
  editTask,
  // findById,
  findTaskById,
  changeStatus,
  deleteTask,
};
