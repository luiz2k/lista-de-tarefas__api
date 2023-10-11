"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const signUp = (username, email, password) => users_1.default.create({ username, email, password });
const findByEmail = (email) => users_1.default.findOne({ email }).select('+password');
const findById = (id) => users_1.default.findById({ _id: id });
exports.default = { signUp, findById, findByEmail };
