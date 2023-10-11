"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEmailSchema = exports.newPasswordSchema = exports.newUsernameSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.newUsernameSchema = zod_1.default.object({
    newUsername: zod_1.default
        .string()
        .min(1, 'O nome deve ter pelo menos 1 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres'),
});
exports.newPasswordSchema = zod_1.default.object({
    currentPassword: zod_1.default.string(),
    newPassword: zod_1.default.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});
exports.newEmailSchema = zod_1.default.object({
    currentEmail: zod_1.default.string().email('Email inválido'),
    newEmail: zod_1.default.string().email('Email inválido'),
});
