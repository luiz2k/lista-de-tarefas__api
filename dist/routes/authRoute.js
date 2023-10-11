"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signin', authControllers_1.default.signIn);
authRouter.post('/signup', authControllers_1.default.signUp);
exports.default = authRouter;
