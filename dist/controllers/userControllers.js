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
const userServices_1 = __importDefault(require("../services/userServices"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield userServices_1.default.getUserById(userId);
        return res.status(200).send({ username: user === null || user === void 0 ? void 0 : user.username });
    }
    catch (error) {
        return res.status(401).send({ error: error });
    }
});
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { password, refreshToken } = req.body;
    try {
        yield userServices_1.default.deleteAccount(userId, password, refreshToken);
        return res.status(200).send({ message: 'Conta deletada com sucesso!' });
    }
    catch (error) {
        return res.status(400).send({ error: error });
    }
});
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { refreshToken } = req.body;
    try {
        yield userServices_1.default.signOut(refreshToken, userId);
        res.status(200).send({ message: 'Logout efetuado com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const changeUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { newUsername } = req.body;
    try {
        yield userServices_1.default.changeUsername(userId, newUsername);
        res.status(200).send({ message: 'Nome de usuário alterado' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { currentEmail, newEmail } = req.body;
    try {
        yield userServices_1.default.changeEmail(userId, currentEmail, newEmail);
        res.status(200).send({ message: 'E-mail alterado com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    try {
        yield userServices_1.default.changePassword(userId, currentPassword, newPassword);
        res.status(200).send({ message: 'Senha alterada com sucesso!' });
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
});
exports.default = {
    getUserById,
    deleteAccount,
    signOut,
    changeUsername,
    changeEmail,
    changePassword,
};
