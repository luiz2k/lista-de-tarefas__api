"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = __importDefault(require("../models/tokens"));
const addRefreshToken = (userId, refreshToken) => tokens_1.default.refreshToken.create({ userId, refreshToken });
const findRefreshToken = (refreshToken) => tokens_1.default.refreshToken.findOne({ refreshToken });
const removeRefreshToken = (refreshToken) => tokens_1.default.refreshToken.deleteOne({ refreshToken });
const findRevokedToken = (revokedToken) => tokens_1.default.revokedToken.findOne({ revokedToken });
const addRevokedToken = (revokedToken, userId) => tokens_1.default.revokedToken.create({ revokedToken, userId });
exports.default = {
    addRefreshToken,
    findRefreshToken,
    removeRefreshToken,
    findRevokedToken,
    addRevokedToken,
};
