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
const taskServices_1 = __importDefault(require("../services/taskServices"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    try {
        const tasks = yield taskServices_1.default.getAllTasks(id);
        res.status(200).send(tasks);
    }
    catch (error) {
        res.status(400).send({ erros: error });
    }
});
const findTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const taskId = req.params.id;
    try {
        const task = yield taskServices_1.default.findTask(taskId, userId);
        res.status(200).send(task);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body.task;
    const userId = req.userId;
    try {
        yield taskServices_1.default.createTask(userId, task);
        res.status(201).send({ message: 'Tarefa criada com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const taskId = req.params.id;
    const newTask = req.body.task;
    try {
        yield taskServices_1.default.editTask(userId, taskId, newTask);
        res.status(200).send({ message: 'Tarefa editada com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const userId = req.userId;
    try {
        yield taskServices_1.default.changeStatus(taskId, userId);
        res.status(200).send({ message: 'Status alterado com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const userId = req.userId;
    try {
        yield taskServices_1.default.deleteTask(taskId, userId);
        res.status(200).send({ message: 'Tarefa deletada com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.default = {
    getAllTasks,
    findTask,
    createTask,
    editTask,
    changeStatus,
    deleteTask,
};
