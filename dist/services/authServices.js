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
const authRepositories_1 = __importDefault(require("../repositories/authRepositories"));
const tokenRepositories_1 = __importDefault(require("../repositories/tokenRepositories"));
const authValidation_1 = require("../validation/authValidation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield authRepositories_1.default.findByEmail(email);
    if (!user)
        throw 'E-mail ou senha inválido';
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword)
        throw 'E-mail ou senha inválido';
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_SECRET_JWT, {
        expiresIn: '1h',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_SECRET_JWT, {
        expiresIn: '7d',
    });
    yield tokenRepositories_1.default.addRefreshToken(String(user._id), refreshToken);
    return {
        message: 'Login efetuado com sucesso',
        token,
        refreshToken,
    };
});
const signUp = (username, email, password, confirmPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = authValidation_1.authSignUpSchema.safeParse({
        username,
        email,
        password,
        confirmPassword,
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
    const findByEmail = yield authRepositories_1.default.findByEmail(email);
    if (findByEmail)
        throw 'E-mail já cadastrado';
    const createAccount = yield authRepositories_1.default.signUp(username, email, password);
    const token = jsonwebtoken_1.default.sign({ id: createAccount._id }, process.env.ACCESS_SECRET_JWT, {
        expiresIn: '1h',
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: createAccount._id }, process.env.REFRESH_SECRET_JWT, {
        expiresIn: '7d',
    });
    yield tokenRepositories_1.default.addRefreshToken(String(createAccount._id), refreshToken);
    return {
        message: 'Conta criada com sucesso',
        token,
        refreshToken,
    };
});
exports.default = {
    signUp,
    signIn,
};
