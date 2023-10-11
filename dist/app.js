"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoDB_1 = __importDefault(require("./database/mongoDB"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'https://listadetarefas-luiz2k.vercel.app' }));
app.use(express_1.default.json());
(0, mongoDB_1.default)();
app.use(index_1.default);
exports.default = app;
