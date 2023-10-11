"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../models/tasks"));
const getAllTasks = (userId) => tasks_1.default.find({ userId });
const createTask = (userId, task, createdAt) => tasks_1.default.create({ userId, task, createdAt });
const editTask = (id, newTask) => tasks_1.default.findByIdAndUpdate({ _id: id }, { $set: { task: newTask } });
// const findById = (id: string) => Task.findById({ userId: id });
const findTaskById = (id) => tasks_1.default.findById({ _id: id });
const changeStatus = (id, newStatus) => tasks_1.default.findByIdAndUpdate({ _id: id }, { $set: { status: newStatus } });
const deleteTask = (id) => tasks_1.default.findByIdAndDelete({ _id: id });
exports.default = {
    getAllTasks,
    createTask,
    editTask,
    // findById,
    findTaskById,
    changeStatus,
    deleteTask,
};
