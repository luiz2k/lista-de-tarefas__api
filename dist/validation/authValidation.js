"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.authSignUpSchema = zod_1.default
    .object({
    username: zod_1.default
        .string()
        .min(1, 'O nome deve ter pelo menos 1 caracteres')
        .max(50, 'O nome deve ter no máximo 50 caracteres'),
    email: zod_1.default.string().email('Email inválido'),
    password: zod_1.default.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: zod_1.default.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
})
    .transform((fields) => ({
    username: fields.username,
    email: fields.email.toLowerCase(),
    password: fields.password,
    confirmPassword: fields.confirmPassword,
}));
