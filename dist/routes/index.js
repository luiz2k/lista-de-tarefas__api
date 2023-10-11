"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("./authRoute"));
const refreshToken_1 = __importDefault(require("./refreshToken"));
const userAuthentication_1 = __importDefault(require("../middlewares/userAuthentication"));
const userRoute_1 = __importDefault(require("./userRoute"));
const taskRoute_1 = __importDefault(require("./taskRoute"));
const router = (0, express_1.Router)();
router.use('/auth', authRoute_1.default);
router.use('/refreshToken', refreshToken_1.default);
router.use(userAuthentication_1.default);
router.use('/user', userRoute_1.default);
router.use('/', taskRoute_1.default);
exports.default = router;
