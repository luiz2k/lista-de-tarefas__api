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
const tasks_1 = __importDefault(require("../models/tasks"));
const users_1 = __importDefault(require("../models/users"));
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return users_1.default.findById(userId); });
const getUserPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () { return users_1.default.findById(userId).select('+password'); });
const deleteAllTasks = (userId) => __awaiter(void 0, void 0, void 0, function* () { return tasks_1.default.deleteMany({ userId: userId }); });
const deleteAccount = (userId, password) => __awaiter(void 0, void 0, void 0, function* () { return users_1.default.findOneAndDelete({ _id: userId, password }); });
const findByEmail = (email) => users_1.default.findOne({ email }).select('+password');
const findById = (id) => users_1.default.findById({ _id: id });
const findByIdAndUpdate = (id, data) => users_1.default.findByIdAndUpdate(id, Object.assign({}, data));
exports.default = {
    getUserById,
    getUserPassword,
    deleteAllTasks,
    deleteAccount,
    findByEmail,
    findById,
    findByIdAndUpdate,
};
