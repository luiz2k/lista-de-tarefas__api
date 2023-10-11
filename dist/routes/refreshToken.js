"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshTokenControllers_1 = __importDefault(require("../controllers/refreshTokenControllers"));
const refreshTokenRouter = (0, express_1.Router)();
refreshTokenRouter.post('/', refreshTokenControllers_1.default.refresh);
exports.default = refreshTokenRouter;
