import Task from '../models/tasks';
import User from '../models/users';

const getUserById = async (userId: string) => User.findById(userId);

const getUserPassword = async (userId: string) =>
  User.findById(userId).select('+password');

const deleteAllTasks = async (userId: string) =>
  Task.deleteMany({ userId: userId });

const deleteAccount = async (userId: string, password: string) =>
  User.findOneAndDelete({ _id: userId, password });

const findByEmail = (email: string) =>
  User.findOne({ email }).select('+password');

const findById = (id: string) => User.findById({ _id: id });

const findByIdAndUpdate = (
  id: string,
  data: {
    username?: string;
    email?: string;
    password?: string;
  },
) => User.findByIdAndUpdate(id, { ...data });

export default {
  getUserById,
  getUserPassword,
  deleteAllTasks,
  deleteAccount,
  findByEmail,
  findById,
  findByIdAndUpdate,
};
