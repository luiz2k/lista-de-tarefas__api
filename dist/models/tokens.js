"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const refreshTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    expire: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 7),
        required: true,
    },
});
const revokedTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    revokedToken: {
        type: String,
        required: true,
    },
    revokedAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
});
const refreshToken = mongoose_1.default.model('refreshToken', refreshTokenSchema);
const revokedToken = mongoose_1.default.model('revokedToken', revokedTokenSchema);
exports.default = { refreshToken, revokedToken };
