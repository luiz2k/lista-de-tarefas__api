"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.taskSchema = zod_1.default.object({
    task: zod_1.default
        .string()
        .min(1, 'Por favor, digite uma tarefa')
        .max(20, 'A tarefa deve ter no máximo 20 caracteres'),
});
