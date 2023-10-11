"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', userControllers_1.default.getUserById);
userRouter.delete('/deleteaccount', userControllers_1.default.deleteAccount);
userRouter.post('/signout', userControllers_1.default.signOut);
userRouter.patch('/changeUsername', userControllers_1.default.changeUsername);
userRouter.patch('/changeEmail', userControllers_1.default.changeEmail);
userRouter.patch('/changePassword', userControllers_1.default.changePassword);
exports.default = userRouter;
