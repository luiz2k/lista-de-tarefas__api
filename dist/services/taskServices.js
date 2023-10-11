"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskRepositories_1 = __importDefault(require("../repositories/taskRepositories"));
const mongoose_1 = __importDefault(require("mongoose"));
const taskValidation_1 = require("../validation/taskValidation");
const getAllTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield taskRepositories_1.default.getAllTasks(userId); });
const findTask = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskRepositories_1.default.findTaskById(taskId);
    if (!mongoose_1.default.Types.ObjectId.isValid(taskId))
        throw 'O id da tarefa é inválido';
    if (String(task === null || task === void 0 ? void 0 : task.userId) !== userId)
        throw 'Você não tem permissão para alterar esta tarefa';
    return task;
});
const createTask = (userId, task) => __awaiter(void 0, void 0, void 0, function* () {
    const result = taskValidation_1.taskSchema.safeParse({
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
    yield taskRepositories_1.default.createTask(userId, task, date);
});
const editTask = (userId, taskId, newTask) => __awaiter(void 0, void 0, void 0, function* () {
    const result = taskValidation_1.taskSchema.safeParse({
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
    const task = yield taskRepositories_1.default.findTaskById(taskId);
    if (!mongoose_1.default.Types.ObjectId.isValid(taskId))
        throw 'O id da tarefa é inválido';
    if (String(task === null || task === void 0 ? void 0 : task.userId) !== userId)
        throw 'Você não tem permissão para editar esta tarefa';
    return yield taskRepositories_1.default.editTask(taskId, newTask);
});
const changeStatus = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskRepositories_1.default.findTaskById(taskId);
    if (!mongoose_1.default.Types.ObjectId.isValid(taskId))
        throw 'O id da tarefa é inválido';
    if (String(task === null || task === void 0 ? void 0 : task.userId) !== userId)
        throw 'Você não tem permissão para alterar o status desta tarefa';
    const newStatus = !(task === null || task === void 0 ? void 0 : task.status);
    return yield taskRepositories_1.default.changeStatus(taskId, newStatus);
});
const deleteTask = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskRepositories_1.default.findTaskById(taskId);
    if (!mongoose_1.default.Types.ObjectId.isValid(taskId))
        throw 'O id da tarefa é inválido';
    if (String(task === null || task === void 0 ? void 0 : task.userId) !== userId)
        throw 'Você não tem permissão para deletar esta tarefa';
    return yield taskRepositories_1.default.deleteTask(taskId);
});
exports.default = {
    getAllTasks,
    findTask,
    createTask,
    editTask,
    changeStatus,
    deleteTask,
};
