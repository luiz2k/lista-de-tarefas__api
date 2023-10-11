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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepositories_1 = __importDefault(require("../repositories/userRepositories"));
const tokenRepositories_1 = __importDefault(require("../repositories/tokenRepositories"));
const updateProfileValidation_1 = require("../validation/updateProfileValidation");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepositories_1.default.getUserById(userId);
    return user;
});
const deleteAccount = (userId, password, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepositories_1.default.getUserPassword(userId);
    if (!user)
        throw 'Usuário não encontrado';
    const findRefreshToken = yield tokenRepositories_1.default.findRefreshToken(refreshToken);
    if (!password)
        throw 'Senha incorreta';
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword)
        throw 'Senha incorreta';
    if (findRefreshToken) {
        yield tokenRepositories_1.default.addRevokedToken(refreshToken, userId);
        yield tokenRepositories_1.default.removeRefreshToken(refreshToken);
    }
    yield userRepositories_1.default.deleteAllTasks(String(user === null || user === void 0 ? void 0 : user._id));
    yield userRepositories_1.default.deleteAccount(userId, user.password);
});
const signOut = (refreshToken, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findRefreshToken = yield tokenRepositories_1.default.findRefreshToken(refreshToken);
    if (findRefreshToken) {
        yield tokenRepositories_1.default.addRevokedToken(refreshToken, userId);
        yield tokenRepositories_1.default.removeRefreshToken(refreshToken);
    }
});
const changeUsername = (userId, newUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const result = updateProfileValidation_1.newUsernameSchema.safeParse({
        newUsername,
    });
    if (!result.success) {
        const formatted = result.error.issues;
        const errors = formatted.map((error) => {
            return {
                path: String(error.path),
                message: error.message,
            };
        });
        throw errors;
    }
    yield userRepositories_1.default.findByIdAndUpdate(userId, { username: newUsername });
});
const changeEmail = (userId, currentEmail, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = updateProfileValidation_1.newEmailSchema.safeParse({
        currentEmail,
        newEmail,
    });
    if (!result.success) {
        const formatted = result.error.issues;
        const errors = formatted.map((error) => {
            return {
                path: String(error.path),
                message: error.message,
            };
        });
        throw errors;
    }
    const findUserById = yield userRepositories_1.default.findById(userId);
    const findUserByEmail = yield userRepositories_1.default.findByEmail(newEmail);
    if ((findUserById === null || findUserById === void 0 ? void 0 : findUserById.email) !== currentEmail)
        throw 'Por favor, informe seu e-mail atual corretamente';
    if ((findUserByEmail === null || findUserByEmail === void 0 ? void 0 : findUserByEmail.email) === newEmail)
        throw 'E-mail já cadastrado';
    yield userRepositories_1.default.findByIdAndUpdate(userId, { email: newEmail });
});
const changePassword = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = updateProfileValidation_1.newPasswordSchema.safeParse({
        currentPassword,
        newPassword,
    });
    if (!result.success) {
        const formatted = result.error.issues;
        const errors = formatted.map((error) => {
            return {
                path: String(error.path),
                message: error.message,
            };
        });
        throw errors;
    }
    const user = yield userRepositories_1.default.findById(userId);
    const password = yield userRepositories_1.default.findByEmail(user === null || user === void 0 ? void 0 : user.email);
    const isValidPassword = yield bcrypt_1.default.compare(currentPassword, password === null || password === void 0 ? void 0 : password.password);
    if (!isValidPassword)
        throw 'Senha atual inválida';
    const newPasswordHash = yield bcrypt_1.default.hash(newPassword, 10);
    yield userRepositories_1.default.findByIdAndUpdate(userId, {
        password: newPasswordHash,
    });
});
exports.default = {
    getUserById,
    deleteAccount,
    signOut,
    changeUsername,
    changeEmail,
    changePassword,
};
