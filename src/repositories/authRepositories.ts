import Users from '../models/users';

const signUp = (username: string, email: string, password: string) =>
  Users.create({ username, email, password });

const findByEmail = (email: string) =>
  Users.findOne({ email }).select('+password');

const findById = (id: string) => Users.findById({ _id: id });

export default { signUp, findById, findByEmail };
