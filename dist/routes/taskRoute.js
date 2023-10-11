"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskControllers_1 = __importDefault(require("../controllers/taskControllers"));
const taskRouter = (0, express_1.Router)();
taskRouter.get('/', taskControllers_1.default.getAllTasks);
taskRouter.post('/create', taskControllers_1.default.createTask);
taskRouter.get('/find/:id', taskControllers_1.default.findTask);
taskRouter.patch('/edit/:id', taskControllers_1.default.editTask);
taskRouter.patch('/changeStatus/:id', taskControllers_1.default.changeStatus);
taskRouter.delete('/delete/:id', taskControllers_1.default.deleteTask);
exports.default = taskRouter;
